import { NextResponse } from "next/server"
import { jwtVerify as verify } from "jose"

const secret = process.env.SECRET_API_KEY //get secret key

export default async function middleware(req) {
	const url = req.url
	//do not run middleware if using below patterns
	if (
		url.includes("/_next") || // exclude Next.js internals
		url.startsWith("/api") || //  exclude all API routes
		url.startsWith("/static") || // exclude static files
		url.includes("/welcome") ||
		url.includes("tet") ||
		url.includes("api") ||
		url.includes("upload") ||
		url.includes("public") ||
		url.includes("lib") ||
		url.includes(".") // exclude all files in the public folder
	)
		return NextResponse.next()

	const jwt = req.cookies.get("SessionJWT") //extract jwt from cookie
	console.log(jwt)
	// if (
	// 	url.includes('/')
	// )
	if (!jwt) {
		console.log("no jwt")
		return NextResponse.redirect(new URL("/welcome", url))
		// return NextResponse.rewrite(new URL("/welcome", url))
	}
	try {
		await verify(jwt, new TextEncoder().encode(secret), (err, decoded) => {
			if (err) return res.sendStatus(403) //invalid token
		})
		console.log("success")
		return NextResponse.next()
	} catch (err) {
		console.log(error.message)
		console.log("login failed")
		return NextResponse.redirect(new URL("/welcome", url))
		// return NextResponse.rewrite(new URL("/welcome", url))
	}

	//run middleware if url contains /testing
	if (url.includes("/testing")) {
		if (jwt === undefined) {
			//fail login if no jwt
			console.log("login failed1")
			return NextResponse.rewrite(new URL("/testpage", url))
		}
		try {
			//test jwt against secret and pass to original target page if success
			await verify(jwt, new TextEncoder().encode(secret))
			console.log("success")
			return NextResponse.next()
		} catch (error) {
			//catch error and send back to login
			console.log(error.message)
			console.log("login failed")
			return NextResponse.rewrite(new URL("/testpage", url))
		}
	}
	return NextResponse.next() //go to target page if neither if statements met
}
