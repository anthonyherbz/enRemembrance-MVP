import { query } from "../../lib/db"

export default async function getServerSideProps(req, res) {
	const post_id = req.body.post_id
	const user = req.body.user
	const text = req.body.text

	try {
		console.log()
		const valuesParams = [post_id, user, text]
		const querySql =
			"INSERT INTO post_comments (post_id, commentor_id, comment_text) values (?, ?, ?)"

		const data = await query({ query: querySql, values: valuesParams })
		const result = res.status(200).json({ message: "success" })
		return { props: result }
	} catch (error) {
		const result = res.status(400).json({ message: error.message })
		return { props: result }
	}
}
