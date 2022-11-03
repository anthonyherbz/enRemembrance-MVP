// import {query} from '../lib/db'
// //SERVERSIDE ONLY FUNCTION ONLY CALL IN GSSP
// export const checkEmail = async (email) => {
// 	console.log("checkdupe email", email)
// 	let valuesParams = [email]
// 	let querySQL = "SELECT EXISTS (SELECT LOWER(email) FROM users WHERE email = ?) AS result;"
// 	const data = await query({ query: querySQL, values: valuesParams })
// 	// console.log(data)
// 	if (data[0].result == 0) return false
// 	if (data[0].result == 1) return true
// } 