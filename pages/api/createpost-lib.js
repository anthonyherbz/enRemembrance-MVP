import { query } from "../../lib/db";

export default async function handler(req, res) {
	const user_id = req.body.user_id
	const story_id = req.body.story_id
	const content = req.body.content
	console.log(user_id, story_id, content)
	try {
		const querySql =
			"INSERT INTO posts (story_id, post_text, user_id) values (?, ?, ?)"
		const valuesParams = [story_id, content, user_id]
		const data = await query({ query: querySql, values: valuesParams })
		res.status(200).json({ data: data })
	} catch (error) {
		res.status(400).json({ message: error.message })
	}
}