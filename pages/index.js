import Head from "next/head";
import Image from "next/image";
import styles from "../sass/Home.module.css";
import Layout from "../components/Layout";
import Col from '../components/Col';
import Row from '../components/Row';
import Logo from '../components/Logo'

export default function Home() {
	return (
		<Layout>
			<Head>
				<title>enRemembrance</title>
				<link rel="icon" href="/favicon.ico" />
				<meta name="description" content="summary of website" />
			</Head>
			<Row>
				<Col xs="4" md="3" lg="2">
					<p>Title Page Content</p>
					<p>Title Page Content</p>
					<p>Title Page Content</p>
				</Col>
				<Col xs="4" md="3" lg="2">
					<p>Title Page Content</p>
					<p>Title Page Content</p>
					<p>Title Page Content</p>
				</Col>
				<Col xs="4" md="3" lg="2">
					<p>Title Page Content</p>
					<p>Title Page Content</p>
					<p>Title Page Content</p>
				</Col>
			</Row>
			<Logo/>
		</Layout>
	);
}
