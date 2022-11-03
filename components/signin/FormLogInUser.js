import { useState } from "react"
import { useRouter } from "next/router"
import Link from "next/link"
import styles from "./formcreateuser.module.scss"

const FormLogInUser = () => {
	const router = useRouter()
	// console.log(URL)

	const [email, setEmail] = useState()
	const [password, setPassword] = useState()
	const [clientOK, setClientOK] = useState(true)
	const [working, setWorking] = useState(false)

	const handleSubmit = async (e) => {
		// console.log("tried to submit")
		e.preventDefault()
		setWorking(true)
		try {
			const login = {
				method: "post",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					email,
					password,
				}),
			}
			const loginData = await fetch("/api/auth2", login)
			const loginRes = await loginData.json()
			// console.log("loginres", loginRes)
			setWorking(false)
			// return console.log("successful login")
			router.push('/')
		} catch (error) {
			setWorking(false)
			return console.log(error.message)
		}
	}

	return (
		<div>
			<form className={styles.form} name='createUser' onSubmit={handleSubmit}>
				<div className={styles.email}>
					<label htmlFor='email' aria-label='required'>
						Email
					</label>
					<input
						onChange={(e) => {
							setEmail(e.target.value)
						}}
						required
						autoComplete='off'
						type='email'
						name='email'
						// pattern="/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/"
						placeholder='Email Address'
						minLength='4'
						maxLength='48'
						title='email'
						className={styles.email}
					/>
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
						title='password'
					/>
				</div>
				{!!password && !!email ? <button type='submit'>Submit</button> : <button disabled>Submit</button>}
			</form>
		</div>
	)
}
export default FormLogInUser
