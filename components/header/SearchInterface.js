import { useState } from "react"
import Router, { useRouter } from "next/router"
import Carousel from "./Carousel"
import styles from "./searchinterface.module.scss"
import next from "next"

const SearchInterface = ({ expand, setExpand }) => {
	const [searchVal, setSearchVal] = useState("") // Store the search string
	const [categories, setCategories] = useState() // Store the categories when the button is clicked
	const [showCarousel, setShowCarousel] = useState(false) // Store the visibility of the category carousel

	function handleSubmit(e) {
		e.preventDefault() // Disable default form submission behavior
	}

	function search(type) {
		// //Will need to redirect to a search page and use headers to confer the query or results to GSSP
		// function sanitizeString(str) { //sanitize input
		// 	str = str.replace(/[^a-z0-9áéíóúñü \.,_-]/gim, "")
		// 	return str.trim()
		// }
		// const parsedString = sanitizeString(searchVal.toLowerCase()) // convert string to lowercase
		// console.log("parsedString", parsedString)
		// async function getData(type) {
		// 	const endPoint = "/api/searchDB-lib"
		// 	const postData = {
		// 		method: "Post",
		// 		headers: { "Content-Type": "application/json" },
		// 		body: JSON.stringify({
		// 			parsedString: parsedString,
		// 			type: type,
		// 		}),
		// 	}
		// 	const response = await fetch(endPoint, postData)
		// 	const res = await response.json()
		// 	console.log(res)
		// }
		// getData(type)
		Router.push({ pathname: "/results", query: { search: searchVal, type: type } })
	}
	// Function to get the categories from the table in DB
	function showCategories() {
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
		getData()
		if (!!categories) setShowCarousel(true) // If categories has a value, set showCarousel to true
	}

	return (
		<form className={styles.interface} onSubmit={handleSubmit}>
			<button className={styles.mobileButton} onClick={() => setExpand(!expand)}>
				{" "}
				{/* Only visible in mobile */}
				Go
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
									showCategories
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
