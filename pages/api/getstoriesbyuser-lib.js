import { query } from "../../lib/db";

export default async function handler(req, res) {
	const id = req.body.id
	try {
		const querySql = "SELECT * FROM stories WHERE author_id = ?";
		const valuesParams = [id];
		const data = await query({query: querySql, values: valuesParams});
		// (await db).end
		res.status(200).json({ stories: data });
	} catch (error) {
		// res.status(400).json({error})
	}
	
}
