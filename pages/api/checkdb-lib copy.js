import { query } from "../../lib/db"
export default async function handler(req, res) {
	const checkVal = req.body.checkVal
	try {
		const querySql =
			"SELECT EXISTS (SELECT email FROM users WHERE email = ?) AS result"
		const valuesParams = [checkVal]
		const data = await query({ query: querySql, values: valuesParams })
		res.status(200).json({ status: data[0].result })
	} catch (error) {
		res.status(400).json({ message: error })
	}
}

// export default function getServerSideProps(){

// }