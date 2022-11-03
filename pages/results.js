import { query as squery } from "../lib/db"
import styles from "../page_sass/results.module.scss"
import Header from "../components/header/Header"
import Head from "next/head"
import Image from "next/image"
import getUser from "../lib/getUser"
import { UserContext } from "./_app"
import { useContext, useEffect } from "react"

export async function getServerSideProps({ query, req }) {
	const { userID, handle } = await getUser(req)
	// console.log("user", userID, handle)
	const { type, search } = query

	function sanitizeString(str) {
		//sanitize input
		str = str.replace(/[^a-z0-9áéíóúñü \.,_-]/gim, "")
		return str.trim()
	}
	const parsedString = sanitizeString(search.toLowerCase())
	// console.log(parsedString)
	if (parsedString == "" || parsedString == " ") {
		return { props: { queryVaild: false, userID, handle } }
	}

	try {
		let querySql
		let valuesParams = [`%${parsedString}%`]
		// let valuesParams = []
		if (type == "story") {
			querySql =
				"SELECT stories.id AS story_id, stories.title, CONVERT(stories.create_date, char) AS create_date, users.handle, users.id AS user_id FROM stories LEFT JOIN users ON users.id = stories.author_id WHERE stories.title LIKE ? ORDER BY create_date DESC"
		}
		if (type == "user") {
			querySql =
				"SELECT users.id, users.handle, users.bio FROM users WHERE users.handle LIKE ?"
		}
		if (type == "tag") {
			querySql =
				"SELECT story_tags.story_id, story_tags.tag_string, stories.id AS story_id, stories.title, CONVERT(stories.create_date, char) AS create_date, users.handle, users.id AS user_id FROM stories LEFT JOIN story_tags ON story_tags.story_id = stories.id LEFT JOIN users ON users.id = stories.author_id WHERE story_tags.tag_string LIKE ? ORDER BY create_date DESC"
		}
		const data = await squery({ query: querySql, values: valuesParams })
		// console.log("datat", data)
		let qvalidity
		if (data.length == 0) {
			qvalidity = false
		} else {
			qvalidity = true
		}
		return { props: { data, type, userID, handle, queryValid: qvalidity } }
	} catch (error) {
		const data = error.message
		return { props: { data } }
	}
}

const Results = ({ data, type, handle, userID, queryValid }) => {
	const { loggedInUser, setLoggedInUser } = useContext(UserContext)
	useEffect(() => {
		setLoggedInUser({ userID, handle })
	}, [handle, setLoggedInUser, userID])
	let styleType
	let searchResults = data

	if (!queryValid)
		styleType = (
			<div className={styles.noResults}>Sorry, there are no results for this query.</div>
		)

	if ((type == "story" || type == "tag") && queryValid) {
		styleType = (
			<div className={styles.results}>
				{searchResults.map((result, index) => {
					// console.log(result)
					return (
						<div className={styles.story} key={index}>
							<div className={styles.cover}>
								<Image
									src={`/images/stories/id${result.story_id}/cover.jpg`}
									width='75'
									height='125'
									alt='story cover'
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
							</div>
						</div>
					)
				})}
			</div>
		)
	}
	if (type == "user" && queryValid) {
		styleType = (
			<div className={styles.results}>
				{searchResults.map((result, index) => {
					// console.log(result)
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
									alt='user profile image'
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
