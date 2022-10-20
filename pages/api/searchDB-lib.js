import { query } from "../../lib/db"

export default async function getServerSideProps(req, res) {
	const searchVal = req.body.parsedString
	const type = req.body.type
	try {
		let querySql
		let valuesParams
		if (type == "story") {
			querySql =
				"SELECT stories.id, stories.title, CONVERT(stories.create_date, char) AS create_date, users.handle, users.id AS user_id FROM stories LEFT JOIN users ON users.id = stories.author_id WHERE stories.title LIKE '%?%'"
		}
		if (type == "user"){
			querySql = "SELECT users.id, users.handle, users.bio FROM users WHERE users.handle LIKE '%?%'"
		}
		if (type == "tag"){
			querySql = "SELECT story_tags.story_id, story_tags.tag_string, stories.id AS story_id, stories.title, CONVERT(stories.create_date, char) AS create_date, users.handle, users.id AS user_id FROM story_tags LEFT JOIN stories ON story_tags.story_id = stories.id LEFT JOIN users ON users.id = stories.author_id WHERE story_tags.tag_string LIKE '%?%'"
		}

		const data = await query({ query: querySql, values: valuesParams })
		const result = res.status(200).json({ data })
		return { props: result }
	} catch (error) {
		const result = res.status(400).json({ message: error })
		return { props: result }
	}
}
