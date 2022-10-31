import { useState } from "react"
import Link from "next/link"
import styles from "./formcreateuser.module.scss"

const FormCreateUser1 = () => {
	const URL = process.env.NEXT_PUBLIC_ROOT
	// console.log(URL)

	const [email, setEmail] = useState()
	const [password, setPassword] = useState()
	const [handle, setHandle] = useState()
	const [fullname, setFullname] = useState()
	const [phone, setPhone] = useState()
	const [emailOK, setEmailOK] = useState(true)
	const [clientOK, setClientOK] = useState(true)
	const [working, setWorking] = useState(false)

	let stylecheck
	// console.log("emailOK", emailOK)
	const hints = {
		//Object with login hints
		fullname: "Your name",
		handle: "A handle between 4 and 24 characters in length",
		password: "A password between 12 and 54 characters in length",
		email: "An email address between 4 and 48 characters in length",
		phone: "An American phone number",
	}
	const verifyEmail = async () => {
		//runs onBlur
		if (email === "") {
			setEmailOK(true)
			setClientOK(true)
			return
		}
		console.log(email)
		const check = {
			method: "post",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ email }),
		}
		console.log(check)
		const checkData = await fetch("/api/checkemail-lib", check)
		const checkRes = await checkData.json()
		console.log(checkRes)
		setEmailOK(!checkRes.data) //if the email exists, set emailOK to false
	}
	if (!emailOK) stylecheck = styles.stylecheck //runs on state change
	const handleSubmit = async (e) => {
		console.log("tried to submit")
		e.preventDefault()
		setWorking(true)
		const cred = {
			//credentials
			method: "post",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				email,
				handle,
				phone,
				fullname,
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
			async function handleRole() {
				console.log("handlerole")
				const pd = {
					method: "post",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({
						userID: createRes.data.insertId,
						kind: "create",
					}),
				}
				const roleData = await fetch("/api/role-lib", pd)
				const roleRes = await roleData.json()
				console.log(roleRes, "roleres")
			}
			handleRole() //creates the role with the userid
			//send the email, pw, and userid to be authenticated against the credentials in the server
			try {
				const login = {
					method: "post",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({
						email,
						password,
						userID: createRes.data.insertId,
					}),
				}
				const loginData = await fetch("/api/auth2", login)
				const loginRes = await loginData.json()
				// console.log("loginres", loginRes)
				setWorking(false)
				Router.push({ pathname: "/" })
				return console.log("successful login")
			} catch (error) {
				setWorking(false)
				return console.log(error.message)
			}
		}
	}

	//Patterns are still generally nonfunctional.
	return (
		<div>
			<form className={styles.form} name='createUser' onSubmit={handleSubmit}>
				<div>
					<label htmlFor='fullname' aria-label='required'>
						Your Full Name
					</label>
					<input
						onChange={(e) => {
							setFullname(e.target.value)
						}}
						required
						type='string'
						autoComplete='off'
						name='fullname'
						// pattern='[a-zA-Z0-9]+'
						placeholder='Full Name'
						minLength='2'
						maxLength='100'
						title={hints.fullname}
					/>
					<div className={styles.hint}></div>
				</div>
				<div className={styles.email}>
					<label htmlFor='email' aria-label='required'>
						Email
					</label>
					<input
						onChange={(e) => {
							setEmail(e.target.value)
							setEmailOK(true) //email is ok if user is typing
						}}
						onBlur={verifyEmail} //Validates that the email is not in the database when focus lost
						required
						autoComplete='off'
						type='email'
						name='email'
						// pattern="/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/"
						placeholder='Email Address'
						minLength='4'
						maxLength='48'
						title={hints.email}
						className={stylecheck}
					/>
					{!emailOK ? (
						<div className={styles.emailalert}>This email is already in use</div>
					) : null}
					<div className={styles.hint}>{hints.email}</div>
				</div>
				<div>
					<label htmlFor='phone' aria-label='required'>
						Phone Number
					</label>
					<input
						required
						onChange={(e) => {
							setPhone(e.target.value)
						}}
						type='tel'
						// pattern="[a-zA-Z]"
						// pattern='[0-9]{3}-[0-9]{3}-[0-9]{4}'
						autoComplete='off'
						name='phone'
						placeholder='#'
						minLength='10'
						maxLength='20'
						title={hints.phone}
					/>
					<div className={styles.hint}>{hints.phone}</div>
				</div>
				<div>
					<label htmlFor='handle' aria-label='required'>
						Handle
					</label>
					<input
						onChange={(e) => {
							setHandle(e.target.value)
						}}
						required
						type='string'
						autoComplete='off'
						name='handle'
						placeholder='Handle'
						minLength='4'
						maxLength='24'
						title={hints.handle}
					/>
					<div className={styles.hint}>{hints.handle}</div>
				</div>
				<div>
					<label htmlFor='password' aria-label='required'>
						Password
					</label>
					<input
						required
						onChange={(e) => {
							setPassword(e.target.value)
						}}
						type='password'
						name='password'
						pattern='[a-zA-Z0-9_!-2@?]{8,}'
						placeholder='Password'
						autoComplete='off'
						minLength='8'
						maxLength='54'
						title={hints.password}
					/>
					<div className={styles.hint}>{hints.password}</div>
				</div>
				{emailOK && !!password && !!handle && !!fullname && !!phone? <button type='submit'>Submit</button> : <button disabled>Submit</button>}
			</form>
		</div>
	)
}
export default FormCreateUser1
