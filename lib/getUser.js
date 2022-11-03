import {compactVerify} from 'jose'

//get the userID from the cookie in page req
const getUser = async (req, res) => {
	const secret = process.env.SECRET_API_KEY
	const jwt = req.cookies.SessionJWT
	if (!jwt) return console.error("error");
	const { payload } = await compactVerify(jwt, new TextEncoder().encode(secret))
	const decodedPayload = JSON.parse(new TextDecoder().decode(payload))
	const userID = decodedPayload.userID
	const handle = decodedPayload.handle
	return { userID, handle }
}
export default getUser;