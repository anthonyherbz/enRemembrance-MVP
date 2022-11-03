import Layout from "../components/utils/Layout"
import Heading from "../components/utils/Heading"
import Head from "next/head"
import Container from "../components/utils/Container"
import Logo from "../components/utils/Logo"


const TermsAndConditions = ({}) => {

	return (
		<Layout>
			<Head>
				<title>enRemembrance</title>
				<link rel='icon' href='/images/icons/logo_temp_blue.svg' />
				<meta name='description' content='summary of website' />
			</Head>
			<Logo/>
			<Container>
				<Heading level='1'>Terms and Conditions</Heading>
				<p>Test content</p>
			</Container>
		</Layout>
	)
}
export default TermsAndConditions
