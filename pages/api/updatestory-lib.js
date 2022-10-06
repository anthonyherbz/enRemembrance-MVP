import { query } from "../../lib/db";

export default async function handler(req, res) {
	let page_json = req.body.storyjson
	let title
	if (req.body.title == undefined){
		title = "new story"
	} else{
		title = req.body.title
	}

	let id = req.body.story_id
	// let id = 186
	// let title = "abc"

	try {
		const querySql = "UPDATE stories SET title = ?, page_json = ? WHERE id = ?";
		const valuesParams = [title, page_json, id];
		const data = await query({query: querySql, values: valuesParams});
		res.status(200).json({ response:"success" });
	} catch (error) {
		res.status(400).json({message: error})
	}
	
}
