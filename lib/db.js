import mysql from "mysql2/promise";

//Establish a connection with the database to perform a single query
export async function query({ query, values = [] }) {
	//Wait for the connection to be created and assign it to db
	const db = await mysql.createConnection({
		host: process.env.DB_HOST,
		database: process.env.DB_NAME,
		user: process.env.DB_USER,
		password: process.env.DB_PASSWORD
	});
	try {
		//Try to execute the query with the provided sql statement and variable values if applicable and store the results in an array
		const [results] = await db.execute(query, values);
		// console.log(results)
		// console.log(results)

		return results;
	} catch (error) {
		//Throw error if there is an error if the try{} fails
		throw Error(error.message);
	} finally {
		//Close the connection just in case
		db.end();
	}
}
///Establish a connection with the database to perform multiple queries within the same connection
export async function multiQuery({ query, values = [] }) {
	const db = await mysql.createConnection({
		multipleStatements: true, //enables usage of multiple statements; vulnerable to SQL injection attacks so need to make sure things are sanitized for production
		host: process.env.DB_HOST,
		database:  process.env.DB_NAME,
		user: process.env.DB_USER,
		password: process.env.DB_PASSWORD
	});

	try {
		const [results] = await db.query(query, values);
		return results;
	} catch (error) {
		throw Error(error.message);
	} finally {
		db.end();
	}
}
