import { query } from "../../lib/db"

export default async function getServerSideProps(req, res) {
	const name = req.body.name
	try {
		const querySql = "SELECT id, name FROM categories WHERE name = ?"
		const valuesParams = [name]
		const data = await query({ query: querySql, values: valuesParams })
		// (await db).end
		const result = res.status(200).json({ categories: data })
		return { props: result }
	} catch (error) {
		const result = res.status(400).json({ message: error.message })
		return { props: result }
	}
}
