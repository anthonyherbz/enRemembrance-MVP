import { query } from "../../lib/db";
export default async function handler(req, res) {
	let date = new Date().toJSON();
	const firstname = req.body.firstname
	const lastname = req.body.lastname
	const handle = req.body.handle
	const email = req.body.email
	const password = req.body.password
	const phone_number = req.body.phone_number
	const join_date = date
	const last_login_date = date
	const enabled = 1
	const bio = "Your bio will go here"
	try {
		const querySql = "INSERT INTO users (firstname = ?, lastname = ?, handle = ?, email = ?, password = ?, phone_number = ?, join_date = ?, last_login_date = ?, enabled = ?, bio = ? )"
		const valuesParams = [firstname, lastname, handle, email, password, phone_number, join_date, last_login_date, enabled, bio];
		const data = await query({query: querySql, values: valuesParams});
		// (await db).end
		res.status(200).json({ categories: data });
	} catch (error) {}
	
}
