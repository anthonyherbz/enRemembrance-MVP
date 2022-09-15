import { query } from "../../lib/db";

export default async function handler(req, res) {


	try {
		const querySql = "SELECT id, name FROM categories";
		const valuesParams = [];
		const data = await query({query: querySql, values: valuesParams});
		// (await db).end
		res.status(200).json({ categories: data });
	} catch (error) {}
	
}
