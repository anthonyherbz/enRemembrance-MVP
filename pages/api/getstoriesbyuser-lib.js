import { query } from "../../lib/db";

export default async function handler(req, res) {
	const id = req.body.id
	const withAge = req.body.withAge
	
	try {
		const querySql = "SELECT id, author_id, title, create_date, publish_date, published, visible, monetized, page_json FROM stories WHERE author_id = ? ORDER BY create_date DESC";
		// const querySql = 'select DATE_FORMAT(create_date, "%Y-%m-%d %H:%i:%s") AS create_date from stories where id = 1'
		const valuesParams = [id];
		const data = await query({query: querySql, values: valuesParams});
		// console.log("data", data)
		if(withAge){
			for (let i = 0; i < data.length; i++){
				let createdDate = new Date (data[i].create_date)
				const today = new Date();
				// console.log(createdDate)
				let age = Math.trunc(
					(today.getTime() - createdDate.getTime()) / (1000 * 3600 * 24)
				);
				data[i].daysOld = age
			}
		}
		// console.log(data)
		res.status(200).json({ stories: data });
	} catch (error) {
		res.status(400).json({message: error.message})
	}
	
}
