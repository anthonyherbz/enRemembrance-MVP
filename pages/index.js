import Head from "next/head";
// import Image from "next/image";
// import styles from "../sass/Home.module.css";
import Layout from "../components/Layout";
import Col from "../components/Col";
import Row from "../components/Row";
// import Logo from "../components/Logo";
import Header from "../components/Header";
import Menu from "../components/Menu";
// import Author from "../components/Author";
// import Button from "../components/Button";
// import Checkbox from "../components/Checkbox";
import Footer from "../components/Footer";
import PostFeed from "../components/PostFeed";

const navLinks = [
	{
		item: "Home",
		slug: "home",
	},
	{
		item: "About",
		slug: "about",
	},
	{
		item: "Contact",
		slug: "contact",
	},
	{
		item: "Terms and Conditions",
		slug: "termsandconditions",
	},
	{
		item: "Support",
		slug: "support",
	},
	{
		item: "Welcome",
		slug: "welcome",
	},
	{
		item: "Testing",
		slug: "testing",
	},
];

export default function Home() {
	return (
		<Layout>
			<Head>
				<title>enRemembrance</title>
				<link rel='icon' href='/favicon.ico' />
				<meta name='description' content='summary of website' />
			</Head>
			<Header show />
			<Row nowrap>
				<Col xs='2' md='2' lg='1'>
					<Menu left menuLinks={navLinks} />
				</Col>
				<Col xs='8' md='8' lg='9' alignItems="center">
					<PostFeed/>
				</Col>
			</Row>
			<Footer/>
		</Layout>
	);
}
