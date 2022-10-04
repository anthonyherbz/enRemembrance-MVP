import { query } from "../../lib/db";

export default async function handler(req, res) {
	let page_json = req.body.storyjson
	let author_id = req.body.user
	let title = req.body.title
	let monetized = 0
	let visible = 0
	let published = 0

	try {
		const querySql = "INSERT INTO stories (author_id, title, published, visible, monetized, page_json) values (?, ?, ?, ?, ?, ?)";
		const valuesParams = [author_id, title, published, visible, monetized, page_json];
		const data = await query({query: querySql, values: valuesParams});
		// (await db).end
		res.status(200).json({ story: data, response:"success" });
	} catch (error) {
		res.status(400).json({message: error})
	}
	
}
