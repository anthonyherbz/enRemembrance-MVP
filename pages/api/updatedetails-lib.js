import { multiQuery, query } from "../../lib/db"
import { hash } from "bcrypt"
import { checkEmail } from "../../lib/login"

export default async function getServerSideProps(req, res) {
	const { newhandle, email, password, bio, userID } = req.body

	let hashedPwd
	let userpwd
	let updateHandle
	let userhandle
	let updateEmail
	let useremail
	let updatePassword
	let updateBio
	let userbio

	try {
		if (newhandle) {
			updateHandle = "UPDATE users SET handle = ? WHERE id = ?;"
			userhandle = userID
		}
		if (email) {
			updateEmail = "UPDATE users SET email = ? WHERE id = ?;"
			useremail = userID
		}
		if (password) {
			updatePassword = "UPDATE users SET password = ? WHERE id = ?;"
			userpwd = userID
			hashedPwd = await hash(password, 10)
		}
		if (bio) {
			updateBio = "UPDATE users SET bio = ? WHERE id = ?;"
			userbio = userID
		}
		if (!email && !newhandle && !password && !bio){
			return {props: res.status(400).json({message: "No request made"})}
		}
		console.log(updateHandle, updateEmail, updatePassword, updateBio)

		let querySql = updateHandle + updateEmail + updatePassword + updateBio
		querySql = querySql.replaceAll("undefined", "")

		console.log(querySql)
		let valuesParams = [
			newhandle,
			userhandle,
			email,
			useremail,
			hashedPwd,
			userpwd,
			bio,
			userbio,
		]
		valuesParams = valuesParams.filter((value) => value != undefined)
		console.log(valuesParams)
		if (email) {
			if (await checkEmail(email)) {
				return { props: res.status(409).json({ message: "Email already exists" }) }
			}
		}
		const data = await multiQuery({ query: querySql, values: valuesParams })
		const result = res.status(201).json({ data, message: "Update successful" })
		return { props: result }
	} catch (error) {
		const result = res.status(500).json({ message: "Internal Server Error: " + error.message })
		return { props: result }
	}
}
