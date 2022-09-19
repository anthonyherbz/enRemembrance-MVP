import { query } from "../../lib/db";

export default async function handler(req, res) {
	let post_date = "2022-09-01 00:00:00"
	let story_id = 89
	let post_text = "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam est enim autem asperiores, dolor voluptas voluptatum eos ad in cumque, sint at neque quas ratione ut quaerat unde temporibus odio!"


	try {
		const querySql = `INSERT INTO posts (post_date, story_id, post_text) values ("${post_date}", "${story_id}", "${post_text}")`;
		console.log(querySql)
		const valuesParams = [];
		const data = await query({query: querySql, values: valuesParams});
		// (await db).end
		res.status(200).json({ posts: data });
	} catch (error) {}
	
}
