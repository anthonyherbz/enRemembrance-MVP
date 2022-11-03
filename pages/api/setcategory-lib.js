import { query } from "../../lib/db"
export default async function getServerSideProps(req, res) {
	const { categoryId, storyId } = req.body
	try {
		let vp = [categoryId, storyId]
		let qsql = "REPLACE into story_categories (category_id, story_id) VALUES (?, ?)"
		const data = await query({ query: qsql, values: vp })
		const response = res.status(200).json({ data })
		return { props: response }
	} catch (error) {
		const response = res.status(500).json({ error: error.message })
		return { props: response }
	}
}
//"INSERT INTO story_categories (category_id, story_id) values (?, ?) ON DUPLICATE KEY UPDATE category_id = ?"

// "INSERT INTO story_categories (category_id, story_id) values (?, ?) ON DUPLICATE KEY UPDATE category_id = ?"
// "REPLACE into table (id, name, age) values(1, "A", 19)"
