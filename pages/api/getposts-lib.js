import { query } from "../../lib/db";

export default async function handler(req, res) {


	try {
		const querySql = "SELECT * FROM posts";
		const valuesParams = [];
		const data = await query({query: querySql, values: valuesParams});
		// (await db).end
		res.status(200).json({ posts: data });
	} catch (error) {}
	
}
