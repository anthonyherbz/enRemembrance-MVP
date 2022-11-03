import { query, multiQuery } from "../../lib/db"
import { hash } from "bcrypt"

//Create a new user

export default async function getServerSideProps(req, res) {
	const URL = process.env.NEXT_PUBLIC_ROOT
	const fullname = req.body.fullname
	const enabled = 1
	const handle = req.body.handle
	const email = req.body.email.toLowerCase()
	const password = req.body.password
	const phone_number = req.body.phone_number

	// check if handle,password,email, etc are missing
	if (!handle || !password || !email || !fullname || !phone_number) {
		return {
			props: res
				.status(406)
				.json({ message: "Form is missing field(s), cannot be submitted" }),
		}
	}
	//Need to do a serverside check if email or handle already in DB. Not using handle check for now
	const checkDupe = async () => {
		let vp = [email, handle.toLowerCase()]
		let qsql1 = "SELECT EXISTS (SELECT LOWER(email) FROM users WHERE email = ?) AS result;"
		let qsql2 = "SELECT EXISTS (SELECT LOWER(handle) FROM users WHERE handle = ?) AS result;"
		let qsql = qsql1 + qsql2
		const data = await multiQuery({ query: qsql, values: vp })
		const emailRes = data[0][0].result
		// const handleRes = data[1][0].result
		if (emailRes == 1)
			return { props: res.status(409).json({ message: "Email already in use" }) }
		// if (handleRes == 1)
		// 	return { props: res.status(406).json({ message: "Handle already in use" }) }
	}
	checkDupe()
	const handleAuth = async (email, hashedPwd, userID) => {
		const end = `${URL}/api/auth`
		const postdata = {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				email: email,
				hashedPwd: hashedPwd,
				userID: userID,
			}),
		}
		const response = await fetch(end, postdata)
		const res = await response.json()
		// console.log(res)
	}
	const handleCreate = async () => {
		const hashedPwd = await hash(password, 10)
		const querySql =
			"INSERT INTO users (fullname, handle, email, password, phone_number, enabled) values (?, ?, ?, ?, ?, ?)"
		const valuesParams = [fullname, handle, email, hashedPwd, phone_number, enabled]
		// console.log("sending")
		try {
			const data = await query({ query: querySql, values: valuesParams })
			const result = res.status(200).json({ data })
			// console.log("RESSS", data, result)
			handleAuth(email, password, data.insertId)
			return { props: data }
		} catch (error) {
			return { props: res.status(400).json({ message: error.message }) }
		}
	}
	handleCreate()

	// try {
	// const hashedPwd = await hash(password, 10)
	// const querySql =
	// 	"INSERT INTO users (fullname, handle, email, password, phone_number, enabled) values (?, ?, ?, ?, ?, ?)"
	// const valuesParams = [fullname, handle, email, hashedPwd, phone_number, enabled]
	// console.log("sending")
	// const data = await query({ query: querySql, values: valuesParams })
	// const result = res.status(200).json({ users: data })
	// // handleAuth(email, hashedPwd, result.users.insertID)
	// return { props: result }
	// } catch (error) {
	// 	const result = res.status(500).json({ message: error.message })
	// 	return { props: result }
	// }
}
