import { query } from "../../lib/db";

//Create a post
export default async function getServerSideProps(req, res) {
	const user_id = req.body.user_id
	const story_id = req.body.story_id
	const content = req.body.content
	try {
		const querySql =
			"INSERT INTO posts (story_id, post_text, user_id) values (?, ?, ?)"
		const valuesParams = [story_id, content, user_id]
		const data = await query({ query: querySql, values: valuesParams })
		const result = res.status(200).json({ data: data })
		return { props: result }
	} catch (error) {
		const result = res.status(400).json({ message: error.message })
		return { props: result }
	}
}