import Head from "next/head"
import ButtonText from "../components/button/ButtonText"
import Header from "../components/header/Header"
import Nav from "../components/Nav"
import styles from "../page_sass/editor.module.scss"
import StoryCreator from "../components/StoryCreator"
import Layout from "../components/Layout"
import { query as squery } from "../lib/db"

import getUser from "../lib/getUser"
import { UserContext } from "./_app"
import { useContext, useEffect } from "react"

export async function getServerSideProps({ query, req }) {
	const { userID, handle } = await getUser(req)
	try {
		let querySql
		let valuesParams = [query.storyId]
		querySql =
			"SELECT id, author_id, title, CONVERT(create_date, char) as create_date, CONVERT(publish_date, char) as publish_date, published, visible, monetized, page_json FROM stories WHERE id = ?"
		const data = await squery({ query: querySql, values: valuesParams })
		return { props: { data: data[0], error: false, userID, handle } }
	} catch (error) {
		const data = error.message
		return { props: { data, error: true, userID, handle } }
	}
}

const Editor = ({ data, error, userID, handle }) => {
	console.log(userID, "UUUid")
	const { loggedInUser, setLoggedInUser } = useContext(UserContext)
	useEffect(() => {
		setLoggedInUser({ userID, handle })
	}, [])
	console.log(loggedInUser)
	if (error) data = null
	return (
		<Layout>
			<Head>
				<title>enRemembrance | Editor</title>
				<link rel='icon' href='/favicon.ico' />
				<meta name='description' content='summary of website' />
			</Head>
			<Header show shadow />
			<div className={styles.editor}>
				<div className={styles.menuSection}>
					<Nav />
				</div>
				<div className={styles.bookSection}>
					<StoryCreator data={data} userID={userID} />
				</div>
			</div>
		</Layout>
	)
}
export default Editor
