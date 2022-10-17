import { query } from "../../lib/db"
export default async function getServerSideProps(req, res) {
	const checkVal = req.body.checkVal
	try {
		const querySql = "SELECT EXISTS (SELECT email FROM users WHERE email = ?) AS result"
		const valuesParams = [checkVal]
		const data = await query({ query: querySql, values: valuesParams })
		const result = res.status(200).json({ status: data[0].result })
		return { props: result }
	} catch (error) {
		const result = res.status(400).json({ message: error })
		return { props: result }
	}
}

