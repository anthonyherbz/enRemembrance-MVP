import { multiQuery, query } from "../../lib/db"
export default async function getServerSideProps(req, res) {
	const update_id = req.body.update_id
	const countVal = req.body.countVal
	const expression_id = req.body.expression
	const type = req.body.type
	const user = req.body.user
	// console.log(update_id)
	// console.log(expression_id)
	// console.log(countVal)

	try {
		let querySql
		let valuesParams
		if (countVal == null) {
			valuesParams = [update_id, expression_id, user]
			if (type == "story") {
				querySql =
					"INSERT INTO story_expressions (story_id, expression_id, count, users_interacted) VALUES (?, ?, 1, JSON_ARRAY(CAST (? AS char)))"
			}
			if (type == "post") {
				querySql =
					"INSERT INTO post_expressions (story_id, expression_id, count, users_interacted) VALUES (?, ?, 1, JSON_ARRAY(CAST (? AS char)))"
			}
		} else {
			valuesParams = [
				`%${user}%`,
				`%${user}%`,
				update_id,
				expression_id,
				`%${user}%`,
				user,
				`%${user}%`,
				user,
				user,
				update_id,
				expression_id,
				update_id,
				expression_id
			]
			if (type == "story") {
				let query1 = `UPDATE story_expressions SET count = CASE WHEN users_interacted NOT LIKE ? THEN (count+1) WHEN users_interacted LIKE ? THEN (count - 1) ELSE count END WHERE story_id = ? and expression_id = ?;`
				let query2 = `UPDATE story_expressions SET users_interacted = CASE WHEN users_interacted NOT LIKE ? THEN JSON_ARRAY_APPEND(users_interacted, '$', CAST(? AS char)) WHEN users_interacted LIKE ? THEN JSON_REMOVE(users_interacted, REPLACE (JSON_SEARCH(users_interacted, 'one', CAST(? AS char)), '"', '')) WHEN users_interacted IS NULL THEN (JSON_ARRAY(CAST(? AS char))) ELSE users_interacted END WHERE story_id = ? and expression_id = ?;`
				let query3 = "SELECT count FROM story_expressions WHERE story_id = ? AND expression_id = ?;"
				querySql = query1+ query2 + query3
			}
			if (type == "post") {
				let query1 = `UPDATE post_expressions SET count = CASE WHEN users_interacted NOT LIKE ? THEN (count+1) WHEN users_interacted LIKE ? THEN (count - 1) ELSE count END WHERE post_id = ? and expression_id = ?;`
				let query2 = `UPDATE post_expressions SET users_interacted = CASE WHEN users_interacted NOT LIKE ? THEN JSON_ARRAY_APPEND(users_interacted, '$', CAST(? AS char)) WHEN users_interacted LIKE ? THEN JSON_REMOVE(users_interacted, REPLACE (JSON_SEARCH(users_interacted, 'one', CAST(? AS char)), '"', '')) WHEN users_interacted IS NULL THEN (JSON_ARRAY(CAST(? AS char))) ELSE users_interacted END WHERE post_id = ? and expression_id = ?;`
				querySql = query1 + query2
			}
		}

		const data = await multiQuery({ query: querySql, values: valuesParams })
		const result = res.status(200).json({ status: data })
		return { props: result }
	} catch (error) {
		const result = res.status(400).json({ message: error.message })
		return { props: result }
	}
}

// let querySql
// 			let valuesParams = [
// 				user,
// 				user,
// 				update_id,
// 				expression_id,
// 				user,
// 				user,
// 				user,
// 				user,
// 				user,
// 				update_id,
// 				expression_id,
// 			]
// 			if (type == "story") {
// 				let query1 = `UPDATE story_expressions SET count = CASE WHEN users_interacted NOT LIKE CONCAT('%', ?, '%') THEN (count+1) WHEN users_interacted LIKE CONCAT('%', ?, '%') THEN (count - 1) ELSE count END WHERE story_id = ? and expression_id = ?;`

// 				let query2 = `UPDATE story_expressions SET users_interacted = CASE WHEN users_interacted NOT LIKE CONCAT('%', ?, '%') THEN JSON_ARRAY_APPEND(users_interacted, '$', CAST(? AS char)) WHEN users_interacted LIKE CONCAT('%', ?, '%') THEN JSON_REMOVE(users_interacted, REPLACE (JSON_SEARCH(users_interacted, 'one', CAST(? AS char)), '"', '')) WHEN users_interacted IS NULL THEN (JSON_ARRAY(CAST(? AS char))) ELSE users_interacted END WHERE story_id = ? and expression_id = ?;`

// 				querySql = query1 + query2
// 			}
// 			if (type == "post") {
// 				querySql =
// 					"INSERT INTO post_expressions (post_id, expression_id, count) VALUES (?, ?, 1)"
// 			}
