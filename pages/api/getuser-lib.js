import { query } from "../../lib/db";

export default async function handler(req, res) {
	const id = req.body.id
	try {
		const querySql = "SELECT id, fullname, handle, email, password, phone_number, join_date, last_login_date, enabled, bio FROM users WHERE id = ?";
		const valuesParams = [id];
		const data = await query({query: querySql, values: valuesParams});
		res.status(200).json({ user: data });
	} catch (error) {}
	
}
