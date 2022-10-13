import { query } from "../../lib/db"

export async function getStaticProps() {
	const querySql = "SELECT * FROM categories"
	try {
		const valuesParams = []
		const data = await query({ query: querySql, values: valuesParams })
		return { props: { data } }
	} catch (error) {
		const data = error
		return { props: { data } }
	}
}
export async function getStaticPaths() {
	const querySql = "SELECT id FROM categories"
	const valuesParams = []
	const data = await query({ query: querySql, values: valuesParams })
	return {
		paths: data.map((data) => ({
			params: { id: data.id.toString() },
		})),
		fallback: false,
	}
}

const Editor = () => {
	return <></>
}
export default Editor
