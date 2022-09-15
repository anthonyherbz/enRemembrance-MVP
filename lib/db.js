import mysql from "mysql2/promise";

export async function query({query, values=[]}) {
	const db = await mysql.createConnection({
		host: "127.0.0.1",
		database: "enremembrance",
		user: "root",
		password: "12345678",

	});

	try {
		const [results] = await db.execute(query, values);
		db.end();
		return results;
	} catch (error) {
		throw Error(error.message)
		return {error}
	} finally {
		db.end();
	}
}
