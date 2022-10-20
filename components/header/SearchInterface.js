import { useState } from "react"
import Carousel from "./Carousel"
import styles from "./searchinterface.module.scss"

const SearchInterface = ({ expand, setExpand }) => {
	const [searchVal, setSearchVal] = useState("")
	const [categories, setCategories] = useState()
	const [showCarousel, setShowCarousel] = useState(false)

	function handleSubmit(e) {
		e.preventDefault()
	}

	function search(type) {
		function sanitizeString(str) {
			str = str.replace(/[^a-z0-9áéíóúñü \.,_-]/gim, "")
			return str.trim()
		}
		const parsedString = sanitizeString(searchVal.toLowerCase())
		async function getData(type) {
			const endPoint = "/api/searchDB-lib"
			const postData = {
				method: "Post",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					query: parsedString,
					type: type,
				}),
			}
			const response = await fetch(endPoint, postData)
			const res = await response.json()
			setExpData(res.expressions)
			console.log(res)
		}
		getData(type)
	}
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
		if (!!categories) setShowCarousel(true)
	}

	return (
		<form className={styles.interface} onSubmit={handleSubmit}>
			<button className={styles.mobileButton} onClick={() => setExpand(!expand)}>
				Go
			</button>
			<div className={styles.interactions}>
				<input
					className={styles.bar}
					onClick={() => setExpand(true)}
					type='text'
					placeholder='Enter your query'
					onChange={(e) => setSearchVal(e.target.value)}
					value={searchVal}
				/>
				{expand ? (
					<div className={styles.dropdown}>
						<input
							className={styles.mobileBar}
							type='text'
							placeholder='Enter your query'
							onChange={(e) => setSearchVal(e.target.value)}
							value={searchVal}
						/>
						<div className={styles.buttons}>
							<button name='user'>Search User</button>
							<button name='story'>Search Story</button>
							<button name='tags'>Search by Tag</button>
							<button onClick={showCategories} name='category'>
								View Categories
							</button>
						</div>
					</div>
				) : null}
				{showCarousel ? (
					<Carousel showCarousel={showCarousel} setShowCarousel={setShowCarousel} categories={categories}/>
				) : null}
			</div>
		</form>
	)
}
export default SearchInterface
