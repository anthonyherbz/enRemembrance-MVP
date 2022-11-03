import { query } from "../../lib/db"
import { hash } from "bcrypt"
import { checkEmail } from "../../lib/login"

export default async function getServerSideProps(req, res) {
	const enabled = 1 //default

	
	// const fullname = "default"
	// const handle = "default"
	// const email = req.body.email
	// const password = req.body.password
	// const phone_number = "default"
	const {fullname, handle, email, password, phone} = req.body

	try {
		//Below if statments handle exceptions if one of the vars is blank, or if the email already exists in the database
		if (!handle || !password || !email || !fullname || !phone) {
			// prettier-ignore
			return { props: res.status(406).json({ message: "Form is missing field(s), cannot be submitted" }) }
		}
		if (await checkEmail(email)) {
			return { props: res.status(409).json({ message: "Email already exists" }) }
		}
		const hashedPwd = await hash(password, 10) //hash the pwd
		const querySql =
			"INSERT INTO users (fullname, handle, email, password, phone_number, enabled) values (?, ?, ?, ?, ?, ?)"
		const valuesParams = [fullname, handle, email, hashedPwd, phone, enabled]
		const data = await query({ query: querySql, values: valuesParams })
		const result = res.status(201).json({data, message: "user created"})
		return { props: result }
	} catch (error) {
		return {
			props: res.status(500).json({ message: "Internal Server Error: " + error.message }),
		}
	}
}
