import { serialize } from "cookie"

//unauth/logout function
export default async function getServersideProps (req, res) {
	//gets the jwt from the cookie. Does not require req.cookies.get, unlike middleware, for unknown reasons (cookie parser middleware?)
	const jwt = req.cookies.SessionJWT

	if (!jwt) { //If there's no jwt tell the browser its not logged in
		return res.json({ message: "Not logged in" })
	} else {
		//sets the cookie jwt to null
		const serialised = serialize("SessionJWT", null, {
			httpOnly: true,
			secure: process.env.NODE_ENV !== "development",
			sameSite: "strict",
			maxAge: -1, //sets the maxage to already expired so it is invalid
			path: "/",
		})
		res.setHeader("Set-Cookie", serialised)
		res.status(200).json({ message: "Success!" })
	}
		
}
