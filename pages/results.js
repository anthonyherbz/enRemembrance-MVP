import { query as squery } from "../lib/db"
import styles from "../page_sass/results.module.scss"
import Header from "../components/header/Header"
import Head from "next/head"
import Image from "next/image"

export async function getServerSideProps({ query }) {
	// console.log(context.query)
	// console.log(query)
	// console.log(context)
	let type = query.type
	let search = query.search
	function sanitizeString(str) {
		//sanitize input
		str = str.replace(/[^a-z0-9áéíóúñü \.,_-]/gim, "")
		return str.trim()
	}
	const parsedString = sanitizeString(search.toLowerCase())
	try {
		let querySql
		let valuesParams = [`%${parsedString}%`]
		// let valuesParams = []
		if (type == "story") {
			querySql =
				"SELECT stories.id AS story_id, stories.title, CONVERT(stories.create_date, char) AS create_date, users.handle, users.id AS user_id FROM stories LEFT JOIN users ON users.id = stories.author_id WHERE stories.title LIKE ?"
		}
		if (type == "user") {
			querySql =
				"SELECT users.id, users.handle, users.bio FROM users WHERE users.handle LIKE ?"
		}
		if (type == "tag") {
			querySql =
				"SELECT story_tags.story_id, story_tags.tag_string, stories.id AS story_id, stories.title, CONVERT(stories.create_date, char) AS create_date, users.handle, users.id AS user_id FROM stories LEFT JOIN story_tags ON story_tags.story_id = stories.id LEFT JOIN users ON users.id = stories.author_id WHERE story_tags.tag_string LIKE ?"
		}
		const data = await squery({ query: querySql, values: valuesParams })
		console.log("dt", data)
		return { props: { data, type } }
	} catch (error) {
		const data = error.message
		return { props: { data } }
	}
}

const Results = ({ data, type }) => {
	// console.log(query)
	// console.log(type)
	// console.log(data)
	let styleType
	let searchResults = data
	let empty = searchResults.length == 0
	console.log(empty)
	if (empty) {
		console.log("xzero")
		styleType = (
			<div className={styles.noResults}>Sorry, there are no results for this query.</div>
		)
	}
	if (type == "story" || (type == "tag" && !empty)) {
		styleType = (
			<div className={styles.results}>
				{searchResults.map((result, index) => {
					console.log(result)
					return (
						<div className={styles.story} key={index}>
							<div className={styles.cover}>
								<Image
									src={`/images/${result.story_id}/cover.jpg`}
									width='75px'
									height='125px'
								/>
							</div>
							<div className={styles.items}>
								<div className={styles.text}>
									<div className={styles.titleBox}>
										<span className={styles.title}>{result.title}</span>
										<span> by {result.handle}</span>
									</div>
									<div className={styles.date}>
										{result.create_date.split(" ", [1])}
									</div>
								</div>
								<div className={styles.tags}>Space for Tags</div>
								<div className={styles.status}>Status Icons</div>
							</div>
						</div>
					)
				})}
			</div>
		)
	}
	if (type == "user" && !empty) {
		styleType = (
			<div className={styles.results}>
				{searchResults.map((result, index) => {
					console.log(result)
					return (
						<div className={styles.user} key={index}>
							<div className={styles.text}>
								<div className={styles.handle}>{result.handle}</div>
								<div className={styles.bio}>
									{result.bio != undefined ? (
										<>{result.bio}</>
									) : (
										"This user doesn't have a bio"
									)}
								</div>
							</div>
							<div className={styles.image}>
								<Image
									src={`/images/users/id${result.id}.jpg`}
									height='75px'
									width='75px'
								/>
							</div>
						</div>
					)
				})}
			</div>
		)
	}
	return (
		<>
			<Head>
				<title>enRemembrance</title>
				<link rel='icon' href='/images/icons/logo_temp_blue.svg' />
				<meta name='description' content='summary of website' />
			</Head>
			<Header show shadow />
			<div className={styles.container}>{styleType}</div>
		</>
	)
}
export default Results
