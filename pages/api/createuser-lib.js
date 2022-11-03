import { query } from "../../lib/db"

//Create a new user

export default async function getServerSideProps(req, res) {
	// if (!req.body.handle || !req.body.pasword || !req.body.email){
	// 	return res.status(400).json({data: 'Form is missing field, cannot be submitted'})
	// }
	const fullname = req.body.fullname
	const enabled = 1
	const handle = req.body.handle
	const email = req.body.email
	const password = req.body.password
	const phone_number = req.body.phone_number

	try {
		const querySql =
			"INSERT INTO users (fullname, handle, email, password, phone_number, enabled) values (?, ?, ?, ?, ?, ?)"
		const valuesParams = [fullname, handle, email, password, phone_number, enabled]
		// console.log("sending")
		const data = await query({ query: querySql, values: valuesParams })
		const result = res.status(200).json({ users: data })
		return { props: result }
	} catch (error) {
		const result = res.status(400).json({ message: error })
		return { props: result }
	}
}
