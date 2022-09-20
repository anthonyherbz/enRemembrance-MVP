import { multiQuery } from "../../lib/db"; 
export default async function handler(req, res) {


	try {
		const querySql = "SELECT * FROM posts; SELECT * FROM users";
		const valuesParams = [];
		const data = await multiQuery({query: querySql, values: valuesParams});
		// (await db).end
		res.status(200).json({ posts: data[0], users: data[1] });
	} catch (error) {}
	
}
