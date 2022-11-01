import getUser from "../lib/getUser"
import { UserContext } from "./_app"
import { useContext, useEffect } from "react"
import Image from "next/image"
import Header from '../components/header/Header'
import ImageUpload from '../components/imageupload'
import Head from "next/head"

export async function getServerSideProps({ req }) {
	const {userID, handle} = await getUser(req)
	return {props: {userID, handle}}
}

const Settings = ({handle, userID}) => {
	const { loggedInUser, setLoggedInUser } = useContext(UserContext)
	useEffect(() => {
		setLoggedInUser({userID, handle})
	}, [])
	return (
		<>
			<Head>
					<title>enRemembrance</title>
					<link rel='icon' href='/images/icons/logo_temp_blue.svg' />
					<meta name='description' content='summary of website' />
				</Head>
			<Header show/>
			<Image src={`/images/users/id${loggedInUser.userID}.jpg`} width="100" height="100" alt="Your profile picture"/>
			<ImageUpload fileNamePath={`/images/users/id${loggedInUser.userID}.jpg`}/>
		</>
	)
}
export default Settings;