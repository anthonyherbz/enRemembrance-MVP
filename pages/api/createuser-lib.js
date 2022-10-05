import { query } from "../../lib/db"
export default async function handler(req, res) {
	// if (!req.body.handle || !req.body.pasword || !req.body.email){
	// 	return res.status(400).json({data: 'Form is missing field, cannot be submitted'})
	// }
	const fullname = req.body.fullname
	// const handle = "testdata2"
	// const email = "testdata2"
	// const password = "testdata2"
	// const phone_number = "000000000"
	const enabled = 1
	const handle = req.body.handle
	const email = req.body.email
	const password = req.body.password
	const phone_number = req.body.phone_number
	// const join_date = date
	// const last_login_date = date
	// const enabled = 1
	// const bio = "Your bio will go here"

	try {
		const querySql =
			"INSERT INTO users (fullname, handle, email, password, phone_number, enabled) values (?, ?, ?, ?, ?, ?)"
		//one question mark per param
		const valuesParams = [
			fullname,
			handle,
			email,
			password,
			phone_number,
			enabled,
		]
		console.log("sending")
		const data = await query({ query: querySql, values: valuesParams })
		// (await db).end
		res.status(200).json({ users: data })
	} catch (error) {
		res.status(400).json({ message: error })
	}
}
