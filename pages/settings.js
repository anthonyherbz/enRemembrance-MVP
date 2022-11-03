import getUser from "../lib/getUser"
import { UserContext } from "./_app"
import { useContext, useEffect, useState } from "react"
import Image from "next/image"
import Header from "../components/header/Header"
import Head from "next/head"
import styles from "../page_sass/settings.module.scss"
import ImageUpload1 from "../components/utils/ImageUpload1"

export async function getServerSideProps({ req }) {
	const { userID, handle } = await getUser(req)
	return { props: { userID, handle } }
}

const Settings = ({ handle, userID }) => {
	const { loggedInUser, setLoggedInUser } = useContext(UserContext)
	const [parentImg, setParentImg] = useState(true)
	const [hasChanged, setHasChanged] = useState(0)
	const [loading, setLoading] = useState(true)
	useEffect(() => {
		setLoggedInUser({ userID, handle })
		setLoading(false)
	}, [handle, setLoggedInUser, userID])
	console.log(userID)
	console.log(loading)
	return (
		<div className={styles.body}>
			<Head>
				<title>enRemembrance</title>
				<link rel='icon' href='/images/icons/logo_temp_blue.svg' />
				<meta name='description' content='summary of website' />
			</Head>
			<Header show />
			{loading ? (
				<p>loading </p>
			) : (
				<>
					<Image
						src={`/images/users/id${userID}.jpg`}
						width='100'
						height='100'
						alt='Your profile picture'
					/>
					<ImageUpload1
						setHasChanged={setHasChanged}
						hasChanged={hasChanged}
						fileNamePath={`/images/users/id${userID}`}
					/>
				</>
			)}
		</div>
	)
}
export default Settings
