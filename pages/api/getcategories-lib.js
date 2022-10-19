import { query } from "../../lib/db"

export default async function getStaticProps(req, res) {
	try {
		const querySql = "SELECT id, name FROM categories"
		const valuesParams = []
		const data = await query({ query: querySql, values: valuesParams })
		const result = res.status(200).json({ categories: data })
		return { props: result }
	} catch (error) {
		const result = res.status(400).json({ message: error.message })
		return { props: result }
	}
}
