import Layout from "../components/Layout"
import Heading from "../components/Heading"
import Container from "../components/Container"
import styles from "../page_sass/welcome.module.scss"
import Row from "../components/Row"
import Col from "../components/Col"
import Logo from "../components/Logo"
import Text from "../components/Text"
import ButtonText from "../components/button/ButtonText"
import Video from "../components/Video"
import ExpandingText from "../components/ExpandingText"
import { useState } from "react"
import SignOverlay from "../components/overlay/SignOverlay"
import PreviewFeed from "../components/post/PreviewFeed"
import Head from "next/head"
import { query } from "../lib/db"

//This is the Landing Page. It be the only page accessible while unauthenticated

//Retrieve the top ten posts from user 1 for the preview feed
export async function getServerSideProps({}) {
	let qsql =
		"SELECT stories.id, stories.author_id, stories.title, CONVERT(stories.create_date, char) as create_date, CONVERT(stories.publish_date, char) as publish_date, stories.published, stories.visible, stories.monetized, stories.page_json, story_users.id AS user_id, story_users.handle AS handle FROM stories LEFT JOIN users story_users ON stories.author_id = story_users.id WHERE story_users.id = 1 LIMIT 10;"
	let vp = []
	try {
		const data = await query({ query: qsql, values: vp })
		return { props: { data } }
	} catch (error) {
		return { props: { data: error.message } }
	}
}

const Welcome = ({ data }) => {
	//State for sign in/up modals
	const [signInShow, setSignInShow] = useState(false)
	const [signUpShow, setSignUpShow] = useState(false)

	//Functions to handle modal toggles
	function handleSignInClick() {
		setSignInShow(!signInShow)
	}
	function handleSignUpClick() {
		setSignUpShow(!signUpShow)
	}
	return (
		<div className={styles.background}>
			<Layout>
				<Head>
					<title>enRemembrance</title>
					<link rel='icon' href='/images/icons/logo_temp_blue.svg' />
					<meta name='description' content='summary of website' />
				</Head>
				<Container>
					{/* Flexbox with center justify, direction row */}
					<Row justifyContent='center'>
						{/* Flex child with width set to 5/10 (50%) */}
						<Col
							textAlign='left'
							lg='5'
							md='5'
							sm='5'
							alignItems='center'
							justifyContent='space-around'>
							<Logo size='2x' /> {/* Logo at 2x default size */}
							<div className={styles.welcome}>
								<Heading color='white' marginBottom='1' level='1'> {/* h1 with margin */}
									Welcome
								</Heading>
								<Row mWidth justifyContent='center' nowrap> {/* Flexbox direction row set to max with, center justify, wrapping off */}
									<Col ratio='1' alignItems='center'>
										<div onClick={handleSignInClick}> {/* Show the sign in modal */}
											<ButtonText color='blue'>Sign In</ButtonText>
										</div>
										<SignOverlay
											signUpShow={signUpShow}
											setSignUpShow={setSignUpShow}
										/>
									</Col>
									<Col ratio='1' alignItems='center'>
										<div onClick={handleSignUpClick}> {/* Show the sign up modal */}
											<ButtonText color='yellow'>Sign Up</ButtonText>
										</div>
										<SignOverlay
											signInShow={signInShow}
											setSignInShow={setSignInShow}
										/>
									</Col>
								</Row>
							</div>
							<div className={styles.container}>
								{/* Flexbox with collapseable text-boxes inside */}
								<Row alignItems='center'>
									<ExpandingText
										title='About'
										color='white'
										backgroundColor='green_landing'>
										Lorem, ipsum dolor sit amet consectetur adipisicing elit.
										Delectus nihil pariatur laboriosam modi ullam aliquid nobis,
										officiis quidem, omnis, aut consectetur est dolore expedita?
										Dignissimos cupiditate aliquid commodi exercitationem
										quisquam!
									</ExpandingText>
								</Row>
								<Row>
									<ExpandingText
										title='Mission'
										color='white'
										backgroundColor='green_landing'>
										Lorem, ipsum dolor sit amet consectetur adipisicing elit.
										Delectus nihil pariatur laboriosam modi ullam aliquid nobis,
										officiis quidem, omnis, aut consectetur est dolore expedita?
										Dignissimos cupiditate aliquid commodi exercitationem
										quisquam!
									</ExpandingText>
								</Row>
							</div>
							{/* <div className={styles.feature}>
								<Text textAlign='center' color='white'>
									COMPETITION/FEATURE SPACE
								</Text>
							</div> */}
						</Col>
						{/* Flex child on the right half othe page, 50% width, aligned center */}
						<Col lg='5' md='5' sm='5' alignItems='center'>
							<Row>
								<Video />
							</Row>
							<Row>
								{/* Shows preview feed of stories with data from getserversideprops */}
								<PreviewFeed stories={data} />
							</Row>
						</Col>
					</Row>
				</Container>
			</Layout>
		</div>
	)
}
export default Welcome
