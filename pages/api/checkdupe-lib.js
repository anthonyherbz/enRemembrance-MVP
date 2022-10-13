import { query } from "../../lib/db"
export default async function getServerSideProps(req, res) {
	const searchID = req.body.searchID
	const matchID = req.body.matchID
	const type = req.body.type
	try {
		let querySql
		if (type == "post") {
			querySql =
				"SELECT EXISTS (SELECT stories.id AS story_id, story_posts.id AS posts_id, post_users.id AS users_id FROM stories INNER JOIN posts story_posts ON stories.id = story_posts.story_id INNER JOIN users post_users ON story_posts.user_id = post_users.id WHERE story_id = ? AND post_users.id = ?) AS result"
		}
		const valuesParams = [searchID, matchID]

		const data = await query({ query: querySql, values: valuesParams })
		const result = res.status(200).json({ isDuplicate: data })
		return { props: result }
	} catch (error) {
		const result = res.status(400).json({ error: error })
		return { props: result }
	}
}
