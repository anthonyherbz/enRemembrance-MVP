import {compactVerify} from 'jose'

//get the userID from the cookie in page req
const getUser = async (req) => {
	const secret = process.env.SECRET_API_KEY
	const jwt = req.cookies.SessionJWT
	const { payload } = await compactVerify(jwt, new TextEncoder().encode(secret))
	const decodedPayload = JSON.parse(new TextDecoder().decode(payload))
	const userID = decodedPayload.userID
	// console.log(userID)
	return userID
}
export default getUser;