import { useState } from "react"
import Link from "next/link"
import styles from "./formcreateuser.module.scss"

const FormCreateUser = () => {
	const URL = process.env.NEXT_PUBLIC_ROOT
	console.log(URL)
	const [emailOK, setEmailOK] = useState(true)
	const [submitted, setsubmitted] = useState(false)
	const [clientVerifOK, setClientVerifOK] = useState(true)
	const [serverVerifOK, setServerVerifOK] = useState(true)
	console.log("emailOK", emailOK)
	let stylecheck
	if (!emailOK) {
		//If the email is unacceptable set the border to the invalid color
		stylecheck = styles.stylecheck
	}
	const hints = {
		//Object with login hints
		fullname: "Your name",
		handle: "A handle between 4 and 24 characters in length",
		password: "A password between 12 and 54 characters in length",
		email: "An email address between 4 and 48 characters in length",
		phone: "An American phone number",
	}

	//Checks the DB if email is valid; clientside verif
	const checkDB = async (event) => {
		const val = event.target.value
		const type = event.target.name
		//If email field is false, set email to OK
		if (val == "" && type == "email") {
			setEmailOK(true)
			return
		}

		//Send the value and type to the api endpoint
		const endpoint = `${URL}/api/checkdb-lib`
		const postData = {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				checkVal: val,
				type: type,
			}),
		}
		const response = await fetch(endpoint, postData)
		const res = await response.json()
		console.log(res)
		// If 1, email exists in DB; if 0, email does not exist in DB
		if (res.status == 1) setEmailOK(false) //Should be false
		if (res.status == 0) setEmailOK(true) //Should be true
	}

	//Create the default profile icon in the user's folder
	async function generateDefaults(id) {
		// const id = 1
		const url = `${URL}/api/generatedefaults-lib`
		const postData = {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				id: id,
				type: "user",
			}),
		}
		const response = await fetch(url, postData)
		const res = await response.json()
		console.log(res)
	}

	//Set the email OK when user is typing
	const clearContent = () => {
		setEmailOK(true)
	}

	const handleSubmit = async (event) => {
		event.preventDefault()
		//Prevent submission if email is not OK
		if (!emailOK) {
			return
		}
		const data = {
			fullname: event.target.fullname.value,
			email: event.target.email.value,
			phone_number: event.target.phone_number.value,
			handle: event.target.handle.value,
			password: event.target.password.value,
		}
		//If any of these are empty set client verification to false and exit
		if (!data.fullname || !data.email || !data.handle || !data.phone_number || !data.password) {
			console.log("clientside verification failed")
			setClientVerifOK(false)
			return
		}

		const endpoint = `${URL}/api/createuser1-lib`
		const postData = {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(data),
		}
		//Send data to the endpoint
		const response = await fetch(endpoint, postData)
		const res = await response.json()

		//If 409, then server has decided that clientside verification has failed and exits before creating user icon or submitted true
		if (response.status == 409) {
			setEmailOK(false)
			console.log("serverside verification failed")
			console.log(res)
			setServerVerifOK(false)
			return
		}
		console.log("response", response)
		console.log("res", res)
		// generateDefaults(res.users.insertId)
		// setsubmitted(true)
	}
	if (submitted == true) {
		return (
			<div>
				<div>User created!</div>
				<Link href='/'>
					<a>
						<button>Click me to go home</button>
					</a>
				</Link>
			</div>
		)
	}
	return (
		<div>
			<form className={styles.form} name='createUser' onSubmit={handleSubmit}>
				<div>
					<label htmlFor='fullname' aria-label='required'>
						Your Full Name
					</label>
					<input
						required
						type='string'
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
						onChange={clearContent}
						// onBlur={checkDB} //Validates that the email is not in the database when focus lost
						required
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
					<label htmlFor='phone_number' aria-label='required'>
						Phone Number
					</label>
					<input
						// required
						type='tel'
						pattern='[0-9]{3}-[0-9]{3}-[0-9]{4}'
						name='phone_number'
						placeholder='000-000-0000'
						minLength='4'
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
						required
						type='string'
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
						type='password'
						name='password'
						pattern='[a-zA-Z0-9_!-2@?]{12,}'
						placeholder='Password'
						minLength='12'
						maxLength='54'
						title={hints.password}
					/>
					<div className={styles.hint}>{hints.password}</div>
				</div>
				{emailOK ? <button type='submit'>Submit</button> : null}
			</form>
		</div>
	)
}
export default FormCreateUser
