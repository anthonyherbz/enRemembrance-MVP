import { multiQuery } from "../../lib/db";

export default async function handler(req, res) {
	const user_id = req.body.user_id
	//ultimately this is going to need to check that a story is visible publically
	try {
		const query1 = "SELECT id, fullname, handle, email, password, phone_number, join_date, last_login_date, enabled, bio FROM users WHERE id = ?;"
		const query2 = "SELECT id AS story_id, title AS story_title FROM stories WHERE author_id = ? ;"

		const querySql = query1+query2
		const valuesParams = [user_id, user_id];
		const data = await multiQuery({query: querySql, values: valuesParams});
		res.status(200).json({ user: data[0], stories: data[1] });
	} catch (error) {
		res.status(400).json({message: error.message})
	}
	
}
