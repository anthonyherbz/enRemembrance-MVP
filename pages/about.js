import Head from "next/head";
import Container from "../components/Container";
import Header from "../components/header/Header";
import Heading from "../components/Heading";
import Text from "../components/Text";
import styles from '../page_sass/about.module.scss'

const About = () => {
	let isLoggedIn = true;
	return (
		<>
			<Head>
				<title>About | enRemembrance</title>
				<link rel='icon' href='/images/icons/logo_temp_blue.svg' />
				<meta name='description' content='summary of website' />
			</Head>
			{isLoggedIn ? <Header show/> : null}
			<div className={styles.about}>
				<Container marginTop>
					<Heading level="2">
						About enRemembrance
					</Heading>
					<p>enRemembrance is a place for sharing memories, stories, and histories about your most cherished friends and family...</p>
					<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque, quam exercitationem! Ad nam eius, ipsam impedit rerum ducimus nulla repudiandae excepturi neque consequuntur itaque ipsum sint esse alias asperiores ex?</p>
					<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Magni ducimus totam, ipsam nemo, reiciendis recusandae consectetur fugit error asperiores ab consequuntur amet eum maiores officia corporis ullam iste perferendis nostrum.</p>
				</Container>
			</div>
		</>
	);
};
export default About;
