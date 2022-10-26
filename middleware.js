import { NextResponse } from "next/server"
import { jwtVerify as verify } from "jose"

const secret = process.env.SECRET_API_KEY //get secret key

export default async function middleware(req) {
	const url = req.url
	const jwt = req.cookies.get("SessionJWT") //extract jwt from cookie
	
	//do not run middleware if using below patterns
	if (
		url.startsWith("/_next") || // exclude Next.js internals
		url.startsWith("/api") || //  exclude all API routes
		url.startsWith("/static") || // exclude static files
		url.includes(".") // exclude all files in the public folder
	) return NextResponse.next()

	//run middleware if url contains /testing
	if (url.includes("/testing")) {
		if (jwt === undefined) { //fail login if no jwt
			console.log("login failed1")
			return NextResponse.rewrite(new URL("/testpage", url))
		}
		try { //test jwt against secret and pass to original target page if success
			await verify(jwt, new TextEncoder().encode(secret))
			console.log("success")
			return NextResponse.next()
		} catch (error) { //catch error and send back to login
			console.log(error.message)
			console.log("login failed")
			return NextResponse.rewrite(new URL("/testpage", url))
		}
	}
	return NextResponse.next() //go to target page if neither if statements met
}
