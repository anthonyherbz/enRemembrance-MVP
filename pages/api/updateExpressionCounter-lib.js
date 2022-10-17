import { query } from "../../lib/db"
export default async function getServerSideProps(req, res) {
	const update_id = req.body.update_id
	const countVal = req.body.countVal
	const expression_id = req.body.expression
	const type = req.body.type
	console.log
	try {
		let querySql;
		if (type == "story"){
			 querySql = "UPDATE story_expressions SET count = ? WHERE story_id = ? AND expression_id = ?"
		}
		if (type == "post"){
			querySql = "UPDATE post_expressions SET count = ? WHERE post_id = ? AND expression_id = ?"
		}
		
		const valuesParams = [countVal, update_id, expression_id]
		const data = await query({ query: querySql, values: valuesParams })
		const result = res.status(200).json({ status: data })
		return { props: result }
	} catch (error) {
		const result = res.status(400).json({ message: error.message })
		return { props: result }
	}
}

