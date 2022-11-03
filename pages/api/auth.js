import { serialize } from "cookie"
import { SignJWT } from "jose"
import { query } from "../../lib/db"
import {compare} from 'bcrypt'

const secret = process.env.SECRET_API_KEY //Secret key from env.development
export default async function auth1 (req, res) {
	const { email, password, userID } = req.body //Destructure user and pass from provided req.body

	const getUser = async () => {
		let qsql = "SELECT email, password FROM users WHERE email = ?"
		let vp = [email]
		const data = await query({query: qsql, values: vp})
		if (!data[0].email){
			return res.status(401).json({ message: "invalid" })
		}
		const match = compare(password, data[0].password, function(err, result){})
		return match
	
	}
	const match = getUser()

	if (match) {
		//if user and password from the DB match provided input

		//Create a new token with jose.signJWT-- store the userID as the payload
		const token = await new SignJWT({ userID: userID })
			.setProtectedHeader({ alg: "HS256" }) //selects encryption algo
			.setExpirationTime("2h") //does not seem to work
			.setIssuedAt()
			.sign(new TextEncoder().encode(secret)) //signs the token using the key from secret encoded to proper text format

		//Names the cookie SessionJWT
		const serialised = serialize("SessionJWT", token, {
			httpOnly: true, //prevents cookie from being accessed with javascript
			secure: process.env.NODE_ENV !== "development",
			sameSite: "strict",
			maxAge: 60 * 60, //Persists for one hour
			path: "/",
		})
		res.setHeader("Set-Cookie", serialised)
		return res.status(200).json({ message: "Success!??" })
	} else {
		res.status(401).json({ message: "invalid" })
	}
}
