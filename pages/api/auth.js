import { serialize } from "cookie"
import {SignJWT} from 'jose'

const secret = process.env.SECRET_API_KEY //Secret key from env.development
export default async function (req, res) {
	const { username, password } = req.body //Destructure user and pass from provided req.body
	const userID = 3 //Test insert id. Will be the insertid or USER id returned from the db query
	if (username == "admin" && password == "admin") { //if user and password from the DB match provided input

		//Create a new token with jose.signJWT-- store the userID as the payload
		const token = await new SignJWT({'userID': userID})
			.setProtectedHeader({alg:"HS256"}) //selects encryption algo
			.setExpirationTime('2h') //does not seem to work
			.setIssuedAt()
			.sign(new TextEncoder().encode(secret)) //signs the token using the key from secret encoded to proper text format
			
		//Names the cookie SessionJWT
		const serialised = serialize("SessionJWT", token, {
			httpOnly: true, //prevents cookie from being accessed with javascript
			secure: process.env.NODE_ENV !== "development",
			sameSite: "strict",
			maxAge: 60 * 60, //Persists for one hour
			path: "/",
	  });
	  res.setHeader("Set-Cookie", serialised);
	  return res.status(200).json({ message: "Success!" });
	} else {
		res.status(401).json({ message: "invalid" })
	}
}
