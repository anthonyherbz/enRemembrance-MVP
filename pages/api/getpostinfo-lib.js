import { multiQuery } from "../../lib/db"; 
export default async function handler(req, res) {
	const story_id = req.body.story_id
	const post_id = req.body.post_id
	try {
		const querySql = "SELECT * FROM stories WHERE id = ?; SELECT * FROM post_comments WHERE post_id = ?";
		const valuesParams = [story_id, post_id];
		const data = await multiQuery({query: querySql, values: valuesParams});
		// (await db).end
		res.status(200).json({ stories: data[0], comments: data[1]});
	} catch (error) {}
	
}
// stories: data[0], comments: data[1], expressions: data[2]
// SELECT * FROM stories WHERE id = ?; SELECT * FROM story_comments WHERE id = ?; SELECT * FROM story_expressions WHERE id = ?