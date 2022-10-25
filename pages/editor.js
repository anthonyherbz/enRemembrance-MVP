import Head from "next/head"
import ButtonText from "../components/button/ButtonText"
import Header from "../components/header/Header"
import Nav from "../components/Nav"
import styles from "../page_sass/editor.module.scss"
import StoryCreator from "../components/StoryCreator"
import Layout from "../components/Layout"
import { query as squery } from "../lib/db"

export async function getServerSideProps({ query }) {
	try {
		let querySql
		let valuesParams = [query.storyId]
		querySql =
			"SELECT id, author_id, title, CONVERT(create_date, char) as create_date, CONVERT(publish_date, char) as publish_date, published, visible, monetized, page_json FROM stories WHERE id = ?"
		const data = await squery({ query: querySql, values: valuesParams })
		return { props: { data: data[0], error: false } }
	} catch (error) {
		const data = error.message
		return { props: { data, error: true } }
	}
}

const Editor = ({ data, error }) => {
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
					{/* buttons to save changes or delete book; not implemented; not useable until database is implemented */}
				</div>
				<div className={styles.bookSection}>
					<StoryCreator data={data} /> : <div>there is already a story</div>
				</div>
			</div>
		</Layout>
	)
}
export default Editor
