import getUser from "../lib/getUser"
import { UserContext } from "./_app"
import { useContext, useEffect, useState } from "react"
import Image from "next/image"
import Header from "../components/header/Header"
import Heading from "../components/utils/Heading"
import Head from "next/head"
import styles from "../page_sass/settings.module.scss"
import ImageUpload1 from "../components/utils/ImageUpload1"

export async function getServerSideProps({ req }) {
	const { userID, handle } = await getUser(req)
	return { props: { userID, handle } }
}

const Settings = ({ handle, userID }) => {
	const { loggedInUser, setLoggedInUser } = useContext(UserContext)
	const [hasChanged, setHasChanged] = useState(false)
	const [loading, setLoading] = useState(true)
	const [newhandle, setNewHandle] = useState()
	const [password, setPassword] = useState()
	const [email, setEmail] = useState()
	const [bio, setBio] = useState()
	const [changes, setChanges] = useState()
	const [emailOK, setEmailOK] = useState(true)
	const [success, setSuccess] = useState()
	useEffect(() => {
		setLoggedInUser({ userID, handle })
		setLoading(false)
	}, [handle, setLoggedInUser, userID])
	// console.log(userID)
	// console.log(loading)

	const verifyEmail = async () => {
		//runs onBlur
		if (email === "") {
			setEmailOK(true)
			return
		}
		// console.log(email)
		const check = {
			method: "post",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ email }),
		}
		// console.log(check)
		const checkData = await fetch("/api/checkemail-lib", check)
		const checkRes = await checkData.json()
		// console.log(checkRes)
		setEmailOK(!checkRes.data) //if the email exists, set emailOK to false
	}

	async function updateDetails(e) {
		e.preventDefault()
		let endpoint = "/api/updatedetails-lib"
		const postData = {
			method: "post",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				newhandle,
				password,
				email,
				bio,
				userID,
			}),
		}
		const data = await fetch(endpoint, postData)
		if (data.status == 201) setSuccess(true)
		if (data.status == 500 || data.status == 409) setSuccess(false)
		console.log(data)
		const res = await data.json()
		console.log(res)
	}

	return (
		<div className={styles.top}>
			<Head>
				<title>enRemembrance</title>
				<link rel='icon' href='/images/icons/logo_temp_blue.svg' />
				<meta name='description' content='summary of website' />
			</Head>
			<Header show />
			<div className={styles.body}>
				{loading ? (
					<p>loading </p>
				) : (
					<div className={styles.profileChanger}>
						<Heading level='2'>Change your profile picture</Heading>
						{hasChanged ? null : (
							<Image
								src={`/images/users/id${userID}.jpg`}
								width='100'
								height='100'
								alt='Your updated profile picture'
							/>
						)}
						<ImageUpload1
							setHasChanged={setHasChanged}
							hasChanged={hasChanged}
							fileNamePath={`/images/users/id${userID}`}
						/>
					</div>
				)}
				<form
					className={styles.detailsChanger}
					onSubmit={(e) => {
						updateDetails(e)
					}}
					name='detailsForm'>
					<Heading level='2'>Change your user details</Heading>
					<div className={styles.mainInfo}>
						<div className={styles.items}>
							<div className={styles.itemBlock}>
								<label htmlFor='handle'>Handle</label>
								<input
									placeholder='yourFaveUser'
									type='text'
									minLength='4'
									maxLength='52'
									name='handle'
									onChange={(e) => {
										setNewHandle(e.target.value)
									}}></input>
							</div>
							<div className={styles.itemBlock}>
								{!emailOK ? (
									<div className={styles.emailCheck}>
										This email is already in use
									</div>
								) : null}
								<label htmlFor='email'>Email</label>
								<input
									placeholder='user@gmail.com'
									type='email'
									minLength='4'
									maxLength='52'
									name='email'
									onBlur={() => {
										verifyEmail()
									}}
									onChange={(e) => {
										setEmail(e.target.value)
										setEmailOK(true)
									}}></input>
							</div>
							<div className={styles.itemBlock}>
								<label htmlFor='password'>Password</label>
								<input
									placeholder='hunter2'
									type='password'
									minLength='8'
									maxLength='52'
									name='password'
									onChange={(e) => {
										setPassword(e.target.value)
									}}></input>
							</div>
						</div>
						<div className={styles.bio}>
							<label htmlFor='bio'>Bio</label>
							<textarea
								placeholder='A little about me...'
								name='bio'
								cols='30'
								rows='5'
								onChange={(e) => {
									setBio(e.target.value)
								}}></textarea>
						</div>
					</div>
					{success == true ? (
						<div className={styles.resultSuccess}>Your request was successful</div>
					) : success == false ? (
						<div className={styles.resultFailure}>Your request was not successful</div>
					) : null}
					<button type='submit' htmlFor='detailsForm'>
						Save Changes
					</button>
				</form>
			</div>
		</div>
	)
}
export default Settings
