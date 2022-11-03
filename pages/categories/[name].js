import Head from "next/head"
import Image from "next/image"
import Link from "next/link"
import Logo from "../../components/utils/Logo"
import { multiQuery, query } from "../../lib/db"
import styles from "../../page_sass/categories.module.scss"
export async function getStaticProps({ params }) {
	let id = params.name
	let query1 = "SELECT * FROM categories WHERE name = ?;"
	let query2 =
		"SELECT categories.name, story_categories.category_id, story_categories.story_id, stories.title, CONVERT(stories.create_date, char) AS create_date, users.handle FROM categories LEFT JOIN story_categories ON story_categories.category_id = categories.id LEFT JOIN stories ON stories.id = story_categories.story_id LEFT JOIN users ON users.id = stories.author_id WHERE categories.name = ?"
	const querySql = query1 + query2
	try {
		const valuesParams = [id, id]
		const data = await multiQuery({ query: querySql, values: valuesParams })
		return { props: { data } }
	} catch (error) {
		const data = error
		return { props: { data } }
	}
}
export async function getStaticPaths() {
	const querySql = "SELECT name FROM categories"
	const valuesParams = []
	const data = await query({ query: querySql, values: valuesParams })
	return {
		paths: data.map((data) => ({
			params: { name: data.name.toString() },
		})),
		fallback: false,
	}
}
const Category = ({ data }) => {
	let category = data[0]
	let items = data[1]
	// console.log(items)
	return (
		<div className={styles.top}>
			<Head>
				<title>enRemembrance</title>
				<link rel='icon' href='/images/icons/logo_temp_blue.svg' />
				<meta name='description' content='summary of website' />
			</Head>
			<div className={styles.controls}>
				<Logo size='2x' />
				<button
					onClick={() => {
						history.back()
					}}>
					Back
				</button>
			</div>
			<div className={styles.results}>
				{items.length == 0 || !category ? (
					items.map((item, index) => {
						return (
							<div key={index}>
								<Link href={`/stories/${item.story_id}`}>
									<div className={styles.item}>
										<Image
											src={`/images/stories/id${item.story_id}/cover.jpg`}
											alt='story cover'
											width='50'
											height='80'
										/>
										<div className={styles.title}>{item.title}</div>
										<div>
											<div>by</div> <div>{item.handle}</div>
										</div>
										<div className={styles.stacked}>
											<div>Created on</div>
											<div>{item.create_date.split(" ", [1])}</div>
										</div>
									</div>
								</Link>
							</div>
						)
					})
				) : category ? (
					<div>There are no results for this category</div>
				) : (
					<div>This category does not exist</div>
				)}
			</div>
		</div>
	)
}
export default Category
