import { query } from "../../lib/db";

export default async function getServerSideProps(req, res) {
	const id = req.body.id	
	const user_id = req.body.user_id
	try {
		const querySql = "DELETE FROM stories WHERE id = ? AND author_id = ?";
		const valuesParams = [id, user_id];
		const data = await query({query: querySql, values: valuesParams});
		console.log(data)
		if (data.affectedRows == 0){
			throw new Error ("Deletion failed")
		}
		const result = res.status(200).json({ message: "deletion successful"});
		return { props: result }
	} catch (error) {
		const result = res.status(400).json({message: error.message})
		return { props: result }
	}
	
}
