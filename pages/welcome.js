import Layout from "../components/Layout";
import Heading from "../components/Heading";
import Container from "../components/Container";
import styles from "../page_sass/welcome.module.scss";
import Row from "../components/Row";
import Col from "../components/Col";
import Logo from "../components/Logo";
import Text from "../components/Text";
import ButtonText from "../components/ButtonText";
import ButtonIcon from "../components/ButtonIcon";
import Checkbox from "../components/Checkbox";
import Video from "../components/Video";
// import styles from '../components/welcome'
//BG needs to stay static, max size, regardless of window size

const Welcome = () => {
	return (
		<div className={styles.background}>
			<Layout>
				{/* <video className={styles.bgvideo}>
					<source src="/videos/lights.mp4"/>
				</video> */}
				<Container>
					<Row justifyContent="center">
						<Col textAlign='center' lg='5' md='5' sm='5' xs='1' alignItems='center'>
							<Logo />
							<div className={styles.welcome}>
								<Heading color="white" marginBottom="1" level='1'>Welcome</Heading>
								<Row mWidth justifyContent="center" nowrap>
									<Col lg='4' alignItems='center'>
										<ButtonText color="blue" label="Sign In"/>
									</Col>
									<Col lg='4' alignItems='center'>
										<ButtonText color="green" label="Sign Up"/>
									</Col>
								</Row>
							</div>
							<div className={styles.container}>
								<Row alignItems='center'>
									<Text textAlign='center'>About</Text>
								</Row>
								<Row>
									<Text>Mission</Text>
								</Row>
							</div>
							<div className={styles.feature}>
								<Text textAlign='center' color='blue'>
									COMPETITION/FEATURE SPACE
								</Text>
							</div>
						</Col>
						<Col lg='5' md='5' sm='5' xs='1' alignItems='center'>
							<Row>
								<Video/>
							</Row>
						</Col>
					</Row>
				</Container>
			</Layout>
		</div>
	);
};
export default Welcome;
