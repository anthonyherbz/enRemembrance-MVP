import Layout from "../components/Layout";
import Heading from "../components/Heading";
import Container from "../components/Container";
import styles from "../page_sass/welcome.module.scss";
import Row from "../components/Row";
import Col from "../components/Col";
import Logo from "../components/Logo";
import Text from "../components/Text";
import ButtonText from "../components/button/ButtonText";
// import ButtonIcon from "../components/ButtonIcon";
// import Checkbox from "../components/Checkbox";
import Video from "../components/Video";
import ExpandingText from "../components/ExpandingText";
import { useState } from "react";
import Overlay from "../components/overlay/Overlay";
import PreviewFeed from "../components/feed/PreviewFeed";
// import styles from '../components/welcome'
//BG needs to stay static, max size, regardless of window size

const Welcome = () => {
	const [signInShow, setSignInShow] = useState(false);
	const [signUpShow, setSignUpShow] = useState(false);
	const books = [
		{
			postID: 0,
			title: "post1",
			slug: "/book_example",
			cover: "bookcover.jpg",
			content:
				"Lorem ipsum, dolor sit amet consectetur adipisicing elit. Incidunt facere modi sequi non minus? Provident blanditiis eos sequi excepturi, a libero officia quia, sed culp facilis dolore velit voluptatem voluptate?",
		},
		{
			postID: 1,
			title: "post2",
			slug: "/book_example",
			cover: "bookcover.jpg",
			content:
				"Lorem ipsum, dolor sit amet consectetur adipisicing elit. Incidunt facere modi sequi non minus? Provident blanditiis eos sequi excepturi, a libero officia quia, sed culp facilis dolore velit voluptatem voluptate?",
		},
		{
			postID: 2,
			title: "post3",
			slug: "/book_example",
			cover: "bookcover.jpg",
			content:
				"Lorem ipsum, dolor sit amet consectetur adipisicing elit. Incidunt facere modi sequi non minus? Provident blanditiis eos sequi excepturi, a libero officia quia, sed culp facilis dolore velit voluptatem voluptate?",
		},
		{
			postID: 3,
			title: "post4",
			slug: "/book_example",
			cover: "bookcover.jpg",
			content:
				"Lorem ipsum, dolor sit amet consectetur adipisicing elit. Incidunt facere modi sequi non minus? Provident blanditiis eos sequi excepturi, a libero officia quia, sed culp facilis dolore velit voluptatem voluptate?",
		},
	];
	console.log(signInShow, signUpShow);
	function handleSignInClick() {
		setSignInShow(!signInShow);
		console.log("signInShow changed to: ", signInShow);
	}
	function handleSignUpClick() {
		setSignUpShow(!signUpShow);
		console.log("signUpShow changed to: ", signUpShow);
	}
	return (
		<div className={styles.background}>
			<div className={styles.backgroundVideo}>
			</div>
			<Layout>
				{/* <video className={styles.bgvideo}>
					<source src="/videos/lights.mp4"/>
				</video> */}
				<Container>
					<Row justifyContent='center'>
						<Col
							textAlign='left'
							lg='5'
							md='5'
							sm='5'
							xs='5'
							alignItems='center'
						>
							<Logo />
							<div className={styles.welcome}>
								<Heading
									color='white'
									marginBottom='1'
									level='1'
								>
									Welcome
								</Heading>
								<Row mWidth justifyContent='center' nowrap>
									<Col ratio='1' alignItems='center'>
										<div onClick={handleSignInClick}>
											<ButtonText
												color='blue'
												label='Sign In'
											/>
										</div>
										<Overlay
											signUpShow={signUpShow}
											setSignUpShow={setSignUpShow}
										/>
									</Col>
									<Col ratio='1' alignItems='center'>
										<div onClick={handleSignUpClick}>
											<ButtonText
												color='yellow'
												label='Sign Up'
											/>
										</div>
										<Overlay
											signInShow={signInShow}
											setSignInShow={setSignInShow}
										/>
									</Col>
								</Row>
							</div>
							<div className={styles.container}>
								<Row alignItems='center'>
									<ExpandingText
										title='About'
										color='white'
										backgroundColor='green_landing'
									>
										Lorem, ipsum dolor sit amet consectetur
										adipisicing elit. Delectus nihil
										pariatur laboriosam modi ullam aliquid
										nobis, officiis quidem, omnis, aut
										consectetur est dolore expedita?
										Dignissimos cupiditate aliquid commodi
										exercitationem quisquam!
									</ExpandingText>
								</Row>
								<Row>
									<ExpandingText
										title='Mission'
										color='white'
										backgroundColor='green_landing'
									>
										Lorem, ipsum dolor sit amet consectetur
										adipisicing elit. Delectus nihil
										pariatur laboriosam modi ullam aliquid
										nobis, officiis quidem, omnis, aut
										consectetur est dolore expedita?
										Dignissimos cupiditate aliquid commodi
										exercitationem quisquam!
									</ExpandingText>
								</Row>
							</div>
							<div className={styles.feature}>
								<Text textAlign='center' color='white'>
									COMPETITION/FEATURE SPACE
								</Text>
							</div>
						</Col>
						<Col lg='5' md='5' sm='5' xs='5' alignItems='center'>
							<Row>
								<Video />
							</Row>
							<Row>
								<PreviewFeed books={books} />
							</Row>
						</Col>
					</Row>
				</Container>
			</Layout>
		</div>
	);
};
export default Welcome;
