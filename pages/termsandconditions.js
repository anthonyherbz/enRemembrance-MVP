import Layout from "../components/Layout"
import Heading from "../components/Heading"
import Head from "next/head"
import Header from "../components/header/Header"
import Container from "../components/Container"
import getUser from "../lib/getUser"
import { UserContext } from "./_app"
import { useContext, useEffect } from "react"

export async function getServerSideProps({ req }) {
	const { userID, handle } = await getUser(req)
	return { props: {userID, handle} }
}

const TermsAndConditions = ({ userID, handle }) => {
	const { loggedInUser, setLoggedInUser } = useContext(UserContext)
	useEffect(() => {
		setLoggedInUser({ userID, handle })
	}, [])

	return (
		<Layout>
			<Head>
				<title>enRemembrance</title>
				<link rel='icon' href='/images/icons/logo_temp_blue.svg' />
				<meta name='description' content='summary of website' />
			</Head>
			<Header show />
			<Container>
				<Heading level='1'>Terms and Conditions</Heading>
				<p>Test content</p>
			</Container>
		</Layout>
	)
}
export default TermsAndConditions
