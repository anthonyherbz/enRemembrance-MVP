import { useState } from "react"
import { compactVerify } from "jose"
import Router from "next/router"

const TP2 = ({}) => {
	//SET STATES ////////////////////////////////
	const [username, setUsername] = useState()
	const [password, setPassword] = useState()
	const [success, setSuccess] = useState()
	const [working, setWorking] = useState(false)
	//////////////////////////////////////////
	console.log(username, password)
	//////////////////////////////////////////

	//button to run logout on click and redirect to the testing page
	async function handleClick() {
		await fetch("/api/unauth")
		// Router.push({ pathname: "/testing" })
	}

	//handle form submssion by passing login info to auth
	const handleSubmit = async (e) => {
		e.preventDefault()
		setWorking(true)
		const cred = {
			//credentials
			method: "post",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				email: username,
				password,
			}),
		}
		//Creates the user with the passed email and password
		const createData = await fetch("/api/createuser2-lib", cred)
		const createRes = await createData.json()
		// console.log("dt", createData)
		// console.log("res", createRes)

		//If the creation is successful
		if (createData.status == 201) {
			//send the email, pw, and userid to be authenticated against the credentials in the server
			try {
				const login = {
					method: "post",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({
						email: username,
						password,
						userID: createRes.data.insertId,
					}),
				}
				const loginData = await fetch("/api/auth2", login)
				const loginRes = await loginData.json()
				// console.log("loginres", loginRes)
				setSuccess(true)
				setWorking(false)
				// return console.log("successful login")
				// Router.push({ pathname: "/" })
			} catch (error) {
				setWorking(false)
				return console.log(error.message)
			}
		}
	}
	return (
		<>
			<form onSubmit={handleSubmit}>
				{success? <div>LOGGIN SUCCESFFUL</div> : null}
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
export default TP2
