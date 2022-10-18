import { query } from "../../lib/db"
export default async function getServerSideProps(req, res) {
	const search_id = req.body.search_id
	const type = req.body.type
	try {
		let querySql;
		if (type == "story"){
			 querySql = "SELECT stories.id AS story_id, story_expressions.expression_id AS expression_id, story_expressions.count AS count, story_expressions_summary.id AS summary_id, story_expressions_summary.name AS summary_name,  story_expressions_summary.description AS summary_description, story_expressions_summary.image_path AS image_path FROM story_expressions  LEFT JOIN stories ON stories.id=story_expressions.story_id  LEFT JOIN expressions story_expressions_summary ON story_expressions.expression_id=story_expressions_summary.id WHERE story_id = ?  ORDER BY expression_id ASC;"
		}
		if (type == "post"){
			querySql = "SELECT posts.id AS post_id, post_expressions.expression_id AS expression_id, post_expressions.count AS count, post_expressions_summary.id AS summary_id, post_expressions_summary.name AS summary_name,  post_expressions_summary.description AS summary_description, post_expressions_summary.image_path AS image_path FROM posts  LEFT JOIN post_expressions ON posts.id=post_expressions.post_id  LEFT JOIN expressions post_expressions_summary ON post_expressions.expression_id=post_expressions_summary.id  WHERE post_id = ? ORDER BY expression_id ASC;"
		}
		
		const valuesParams = [search_id]
		const data = await query({ query: querySql, values: valuesParams })
		const result = res.status(200).json({ expressions: data })
		return { props: result }
	} catch (error) {
		const result = res.status(400).json({ message: error.message })
		return { props: result }
	}
}

