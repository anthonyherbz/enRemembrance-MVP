import { query } from "../../lib/db";

export default async function getServerSideProps(req, res) {
	const id = req.body.id
	try {
		// const querySql = "SELECT id, author_id, title, create_date, publish_date, published, visible, monetized, page_json FROM stories WHERE id = ?";

		const querySql = "SELECT stories.id, stories.author_id, stories.title, stories.create_date, stories.publish_date, stories.published, stories.visible, stories.monetized, stories.page_json, story_users.id AS user_id, story_users.handle AS handle FROM stories LEFT JOIN users story_users ON stories.author_id = story_users.id WHERE stories.id = ?"

		const valuesParams = [id];
		const data = await query({query: querySql, values: valuesParams});
		const result = res.status(200).json({ story: data });
		return { props: result }
	} catch (error) {
		const result = res.status(400).json({ message: error.message })
		return { props: result }
	}
}
