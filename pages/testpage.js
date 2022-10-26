import { useState } from "react"
import { compactVerify } from "jose"
import Router from "next/router"

// Test of a GSSP function to extract the user ID from the cookie
export async function getServerSideProps({req}) {
	const jwt = req.cookies.SessionJWT //get jwt
	if (!jwt) return {props:{ userID: null}} //return id null if no jwt
	const secret = process.env.SECRET_API_KEY
	const { payload, protectedHeader } = await compactVerify(jwt, new TextEncoder().encode(secret)) //verify jwt against secret
	const decodedPayload = JSON.parse(new TextDecoder().decode(payload)) //decode payload and parse into json object instead of string (default)
	const userID = decodedPayload.userID //extract userid from json obj
	console.log(userID)
	return { props: { userID: userID } }
}

// Test page for log in and log out functionality
const TestPage = ({ userID }) => {
	console.log(userID)
	//store user/pass ins tate
	const [username, setUsername] = useState()
	const [password, setPassword] = useState()

	//button to run logout on click and redirect to the testing page
	async function handleClick() {
		await fetch("/api/unauth")
		Router.push({ pathname: "/testing" })
	}

	//handle form submssion by passing login info to auth
	const handleSubmit = async (e) => {
		e.preventDefault()
		console.log("submitted")
		const cred = { //credentials
			method: "post",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				username,
				password,
			}),
		}
		const user = await fetch("/api/auth", cred)
		const res = await user.json()
		console.log(res)
		if (user.status == 200) { //if successful send to testing page
			Router.push({ pathname: "/testing" })
		}
	}
	return (
		<>
			<form onSubmit={handleSubmit}>
				<label htmlFor='username'>Username</label>
				<input
					type='username'
					name='username'
					onChange={(e) => setUsername(e.target.value)}
				/>
				<label htmlFor='password'>Password</label>
				<input
					type='password'
					name='password'
					onChange={(e) => setPassword(e.target.value)}
				/>
				<button>submit</button>
			</form>
			<button onClick={handleClick}>Logout</button>
		</>
	)
}
export default TestPage
