import Head from "next/head"
import ButtonText from "../components/button/ButtonText"
import Header from "../components/header/Header"
import Nav from "../components/menu/Nav"
import styles from "../page_sass/editor.module.scss"
import StoryCreator from "../components/story/editor/StoryCreator"
import Layout from "../components/utils/Layout"
import { multiQuery } from "../lib/db"

import getUser from "../lib/getUser"
import { UserContext } from "./_app"
import { useContext, useEffect } from "react"

export async function getServerSideProps({ query, req }) {
	const { userID, handle } = await getUser(req)
	try {
		let querySql
		let valuesParams = [query.storyId]
		let query1 =
			"SELECT id, author_id, title, CONVERT(create_date, char) as create_date, CONVERT(publish_date, char) as publish_date, published, visible, monetized, page_json FROM stories WHERE id = ?;"
		let query2 = "SELECT name, id FROM categories;"
		querySql = query1+query2
		const data = await multiQuery({ query: querySql, values: valuesParams })
		return { props: { data: data[0], categories: data[1], error: false, userID, handle } }
	} catch (error) {
		const data = error.message
		return { props: { data, error: true, userID, handle } }
	}
}

const Editor = ({ data, categories, error, userID, handle }) => {
	// console.log(data, categories)
	const { loggedInUser, setLoggedInUser } = useContext(UserContext)
	useEffect(() => {
		setLoggedInUser({ userID, handle })
	}, [handle, setLoggedInUser, userID])
	if (error) data = null
	return (
		<Layout>
			<Head>
				<title>enRemembrance | Editor</title>
				<link rel='icon' href='/images/icons/logo_temp_blue.svg' />
				<meta name='description' content='summary of website' />
			</Head>
			<Header show shadow />
			<div className={styles.editor}>
				<div className={styles.menuSection}>
					<Nav />
				</div>
				<div className={styles.bookSection}>
					<StoryCreator data={data[0]} userID={userID} categories={categories} />
				</div>
			</div>
		</Layout>
	)
}
export default Editor
