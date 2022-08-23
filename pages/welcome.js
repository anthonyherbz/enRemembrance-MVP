import Layout from "../components/Layout";
import Heading from "../components/Heading";
import Container from "../components/Container";
import styles from "../page_sass/welcome.module.scss";
import Row from "../components/Row";
import Col from "../components/Col";
import Logo from "../components/Logo";
import Text from "../components/Text";
import Button from "../components/Button";
import Checkbox from "../components/Checkbox";
// import styles from '../components/welcome'
//BG needs to stay static, max size, regardless of window size

const Welcome = () => {
	return (
		<div className={styles.background}>
			<Layout>
				<Container>
					<Row>
						<Col textAlign='center' lg='5' alignItems='center'>
							<Logo />
							<div className={styles.welcome}>
								<Heading level='1'>Welcome</Heading>
								<Row justifyContent="center" nowrap>
									<Col lg='4' alignItems='center'>
										<Button icon="logo_temp" color="blue" label="Sign In"/>
									</Col>
									<Col lg='4' alignItems='center'>
										<Button color="green" label="Sign Up"/>
									</Col>
								</Row>
								<Checkbox/>
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
						<Col lg='5' alignItems='center'>
							<div className={styles.video}>Video</div>
						</Col>
					</Row>
				</Container>
			</Layout>
		</div>
	);
};
export default Welcome;
