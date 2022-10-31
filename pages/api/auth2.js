import { serialize } from "cookie"
import { SignJWT } from "jose"
import { query } from "../../lib/db"
import {compare} from 'bcrypt'
import { checkEmail } from "../../lib/login"
const secret = process.env.SECRET_API_KEY //Secret key from env.development


export default async function (req, res) {
	const { email, password } = req.body //Destructure user and pass from provided req.body
	if (!await checkEmail(email)){
		return {props: res.status(404).json({message: "Email does not exist"})}
	}
	
	const querySQL = "SELECT password, id, handle FROM users WHERE email = ?"
	const valuesParams = [email]
	const data = await query({ query: querySQL, values: valuesParams })
	const userID = data[0].id
	const hashedPwd = data[0].password
	const handle = data[0].handle
	// console.log("data", data)
	// console.log("from auth", data[0])
	const pwMatch = await compare(password, hashedPwd)

	if (pwMatch) {
		//if user and password from the DB match provided input

		//Create a new token with jose.SignJWT-- store the userID as the payload
		const token = await new SignJWT({ userID, handle })
			.setProtectedHeader({ alg: "HS256" }) //selects encryption algo
			.setExpirationTime("2h")
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
		return res.status(200).json({ message: "Successful login." })
	} else {
		res.status(401).json({ message: "invalid" })
	}
}
