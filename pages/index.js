import Head from "next/head"
import Layout from "../components/Layout"
import Col from "../components/Col"
import Row from "../components/Row"
import Header from "../components/header/Header"
import Footer from "../components/Footer"
import Container from "../components/Container"
import Nav from "../components/Nav"
import MobileNav from "../components/MobileNav"
import PostFeedv2 from "../components/post/PostFeedv2"

export default function Home(destruct) {
	console.log(destruct)
	const {posts, comments} = destruct.destruct
	console.log(posts, comments)
	return (
		<Layout>
			<Head>
				<title>enRemembrance</title>
				<link rel='icon' href='/images/icons/logo_temp_blue.svg' />
				<meta name='description' content='summary of website' />
			</Head>
			<Header show />
			<MobileNav />
			<Container marginTop>
				<Row nowrap mHeight>
					<Col ratio='1'>
						<Nav border topSpace='50' />
					</Col>
					<Col
						border='left'
						ratio='20'
						alignItems='center'
						allowScroll>
						<Container>
							<div
								style={{
									height: "1px",
									width: "100%",
									borderBottom: "1px solid #55545C",
									position: "fixed",
									top: "50px",
									zIndex: 2,
									boxShadow: "rgb(0, 0, 0) 0 2px 5px 0px",
								}}></div>
							<PostFeedv2 posts={posts} comments={comments} />
						</Container>
					</Col>
				</Row>
			</Container>
			<Footer />
		</Layout>
	)
}
export async function getServerSideProps() {
	const response = await fetch('http://localhost:3000/api/getposts-lib')
	const res = await response.json()
	const destruct = res
	return {
		props: {
			destruct,
		},
	}
}
