import { query } from "../../lib/db";

export default async function handler(req, res) {
	const id = req.body.date
	try {

		// const querySql = "SELECT id, author_id, title, create_date, publish_date, published, visible, monetized, page_json FROM stories WHERE author_id = ?";
		// const valuesParams = [id];
		// const data = await query({query: querySql, values: valuesParams});
		// // (await db).end
		res.status(200).json({ age: age });
	} catch (error) {
		res.status(400).json({message: error.message})
	}
	
}
