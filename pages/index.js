import Head from "next/head";
import Image from "next/image";
import styles from "../sass/Home.module.css";
import Layout from "../components/Layout";
import Col from "../components/Col";
import Row from "../components/Row";
import Logo from "../components/Logo";
import Header from "../components/Header";
import Menu from "../components/Menu";
import Author from "../components/Author";

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
			<Row>
				<Col xs='2' md='2' lg='2'>
					<Menu left menuLinks={navLinks} />
				</Col>
				<Col xs='6' md='6' lg='8'>
					<Row>
						<Col xs='4' md='3' lg='4'>
							<p>Title Page Content</p>
							<p>Title Page Content</p>
							<p>Title Page Content</p>
						</Col>
						<Col xs='4' md='3' lg='4'>
							<p>Title Page Content</p>
							<p>Title Page Content</p>
							<p>Title Page Content</p>
						</Col>
						<Col xs='4' md='3' lg='4'>
							<p>Title Page Content</p>
							<p>Title Page Content</p>
							<p>Title Page Content</p>
						</Col>
					</Row>
				</Col>
			</Row>
			<Logo />
			<Author/>
		</Layout>
	);
}
