import Layout from "../components/Layout"
import Heading from "../components/Heading"
import Container from "../components/Container"

const TermsAndConditions = () => {
	return (
		<Layout>
			<Head>
				<title>enRemembrance</title>
				<link rel='icon' href='/images/icons/logo_temp_blue.svg' />
				<meta name='description' content='summary of website' />
			</Head>
			<Container>
				<Heading level = "1">Terms and Conditions</Heading>
				<p>
					Test content
				</p>
			</Container>
		</Layout>
	)
}
export default TermsAndConditions;