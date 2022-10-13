import { multiQuery } from "../../lib/db";

export default async function getServerSideProps(req, res) {
	try {
		const valuesParams = [];
		const query1 = "SELECT posts.post_text, posts.id AS post_id, posts.post_date, post_users.handle AS post_user_handle, post_users.id AS post_user_id, stories.title, stories.id AS story_id, stories.publish_date AS story_publish_date, post_expressions.expression_id AS post_expressions_id, post_expressions.count AS post_expressions_count,story_expressions.expression_id AS story_expressions_id, story_expressions.count AS story_expressions_count,post_expressions_summary.id AS post_expressions_summary_id, post_expressions_summary.name AS post_expressions_summary_name, post_expressions_summary.description AS post_expressions_summary_description, post_expressions_summary.image_path AS post_expressions_summary_image_path,story_expressions_summary.id AS story_expressions_summary_id, story_expressions_summary.name AS story_expressions_summary_name, story_expressions_summary.description AS story_expressions_summary_description, story_expressions_summary.image_path AS story_expressions_summary_image_path FROM posts LEFT JOIN users post_users ON posts.user_id=post_users.id LEFT JOIN stories ON posts.story_id=stories.id  LEFT JOIN post_expressions ON posts.id=post_expressions.post_id LEFT JOIN story_expressions ON stories.id=story_expressions.story_id LEFT JOIN expressions post_expressions_summary ON post_expressions.expression_id=post_expressions_summary.id LEFT JOIN expressions story_expressions_summary ON story_expressions.expression_id=story_expressions_summary.id;"
		const query2 = "SELECT post_comments.post_id AS post_comments_id, post_comments.commentor_id, post_comments.comment_date, post_comments.comment_text, users.id AS user_id, users.handle FROM post_comments LEFT JOIN posts ON post_comments.post_id = posts.id LEFT JOIN users ON post_comments.commentor_id = users.id;"
		const querySql = query1 + query2


		const data = await multiQuery({query: querySql, values: valuesParams});
		const result = res.status(200).json({ posts: data[0], comments: data[1] });
		return { props: result }
	} catch (error) {
		const result = res.status(400).json({message: error.message})
		return { props: result }
	}
	
}
