import {compactVerify} from 'jose'
import {query} from './db'

//get the userID from the cookie in page req
const getUser = async (req, res) => {
	const secret = process.env.SECRET_API_KEY
	const jwt = req.cookies.SessionJWT
	if (!jwt) return console.error("error");
	const { payload } = await compactVerify(jwt, new TextEncoder().encode(secret))
	const decodedPayload = JSON.parse(new TextDecoder().decode(payload))
	const userID = decodedPayload.userID
	const handle = decodedPayload.handle

	// try{
	// 	let qsql = "SELECT users.id, users.handle FROM users WHERE users.id = ?"
	// 	let vp = [userID]
	// 	const data = await query({query: qsql, values: vp})
	// 	const result = res.status(200).json({data})
	// 	return result
	// }catch (err){
	// 	return res.status(500).json({message: err.message})
	// }

	// console.log(userID)
	return { userID, handle }
}
export default getUser;