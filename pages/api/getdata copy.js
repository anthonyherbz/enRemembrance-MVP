import mysql from "mysql2/promise";

export default async function handler(req, res) {
	const db = await mysql.createConnection({
		host: "127.0.0.1",
		database: "enremembrance",
		user: "root",
		password: "12345678",
		// socketPath: '/private/tmp/mysql.sock'
		///tmp/mysqlx.sock
	});

	try {
		const query = "SELECT id, name FROM categories";
		const values = [];
		const [data] = await (await db).execute(query, values);
		// (await db).end
		res.status(200).json({ categories: data });
		db.end();
	} catch (error) {
		res.status(500).json({ error: error.message });
		db.end();
	} finally {
		db.end();
	}
	// res.status(200).json({name: "John Doe"})
}
