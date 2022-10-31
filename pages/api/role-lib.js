import { query } from "../../lib/db"

export default async function getServerSideProps(req, res) {
	// console.log(req)
	const kind = req.body.kind
	const userID = req.body.userID
	try {
		let qSQL
		let valParams = [userID]
		if (kind == "create") {
			qSQL = "INSERT INTO user_role_mappings (user_id, role_id) values (?, 1)"
		}
		if (kind == "check") {
			qSQL =
				"SELECT users.handle, users.id AS user_id, roles.id AS role_id, roles.description AS role_description, roles.type AS role_type FROM users LEFT JOIN user_role_mappings ON user_role_mappings.user_id = users.id LEFT JOIN roles ON user_role_mappings.role_id = roles.id WHERE users.id = ?"
		}
		const data = await query({ query: qSQL, values: valParams })
		const result = res.status(200).json({ data, message: `success for ${kind}` })
		return { props: result }
	} catch (err) {
		return { props: res.status(400).json({ message: err.message }) }
	}
}
