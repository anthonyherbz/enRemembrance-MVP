import { useState } from "react"
import Router from "next/router"
import Carousel from "./Carousel"
import styles from "./searchinterface.module.scss"
import Image from "next/image"

const SearchInterface = ({ expand, setExpand }) => {
	const [searchVal, setSearchVal] = useState("") // Store the search string
	const [categories, setCategories] = useState() // Store the categories when the button is clicked
	const [showCarousel, setShowCarousel] = useState(false) // Store the visibility of the category carousel

	function handleSubmit(e) {
		e.preventDefault() // Disable default form submission behavior
	}

	function search(type) {
		Router.push({ pathname: "/results", query: { search: searchVal, type: type } })
	}
	// Function to get the categories from the table in DB
	async function showCategories() {
		// console.log("showc")
		async function getData() {
			const endPoint = "/api/getcategories-lib"
			const postData = {
				method: "Post",
				headers: { "Content-Type": "application/json" },
			}
			const response = await fetch(endPoint, postData)
			const res = await response.json()
			setCategories(res.categories)
			// console.log(res)
		}
		await getData()
		setShowCarousel(true) // If categories has a value, set showCarousel to true
	}

	return (
		<form className={styles.interface} onSubmit={handleSubmit}>
			<button className={styles.mobileButton} onClick={() => setExpand(!expand)}>
				{/* Only visible in mobile */}
				<Image src={`/images/icons/search.png`} width="25" height="25" alt="search icon"/>
			</button>
			<div className={styles.interactions}>
				<input // Display: none in mobile
					className={styles.bar}
					onClick={() => setExpand(true)}
					type='text'
					placeholder='Enter your query'
					onChange={(e) => setSearchVal(e.target.value)}
					value={searchVal}
				/>
				{expand ? ( // Show if expand is true
					<div className={styles.dropdown}>
						<input // Display none in desktop
							className={styles.mobileBar}
							type='text'
							placeholder='Enter your query'
							onChange={(e) => setSearchVal(e.target.value)}
							value={searchVal}
						/>
						<div className={styles.buttons}>
							<button
								onClick={() => {
									search("user")
								}}
								name='user'>
								Search User
							</button>
							<button
								onClick={() => {
									search("story")
								}}
								name='story'>
								Search Story
							</button>
							<button
								onClick={() => {
									search("tag")
								}}
								name='tags'>
								Search by Tag
							</button>
							<button
								onClick={() => {
									showCategories()
								}}
								name='category'>
								View Categories
							</button>
						</div>
					</div>
				) : null}
				{showCarousel ? (
					<Carousel
						showCarousel={showCarousel}
						setShowCarousel={setShowCarousel}
						categories={categories}
					/>
				) : null}
			</div>
		</form>
	)
}
export default SearchInterface
