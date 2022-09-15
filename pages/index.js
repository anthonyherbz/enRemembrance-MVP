import Head from "next/head";
import Layout from "../components/Layout";
import Col from "../components/Col";
import Row from "../components/Row";
import Header from "../components/header/Header";
import Footer from "../components/Footer";
import PostFeed from "../components/post/PostFeed";
import Container from "../components/Container";
import Nav from "../components/Nav";
import MobileNav from "../components/MobileNav";

export default function Home() {
	const posts = [
		{
			postId: 0,
			postTitle: "Post Title",
			postContent:
				"Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos quos nemo illo maiores",
			bookTitle: "title",
			bookCover: "bookcover.jpg",
			bookSlug: "book1",
			author: "author1",
			authorProfile: "profile.jpg",
			comment: "comment text",
			commentAuthor: "commenter1",
		},
		{
			postId: 1,
			postTitle: "Post Title",
			postContent:
				"Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos quos nemo illo maiores",
			bookTitle: "title",
			bookCover: "bookcover.jpg",
			bookSlug: "book1",
			author: "author1",
			authorProfile: "profile.jpg",
			comment: "comment text",
			commentAuthor: "commenter1",
		},
		{
			postId: 2,
			postTitle: "Post Title",
			postContent:
				"Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos quos nemo illo maiores",
			bookTitle: "title",
			bookCover: "bookcover.jpg",
			bookSlug: "book1",
			author: "author1",
			authorProfile: "profile.jpg",
			comment: "comment text",
			commentAuthor: "commenter1",
		},
	];
	return (
		<Layout>
			<Head>
				<title>enRemembrance</title>
				<link rel='icon' href='/images/icons/logo_temp_blue.svg' />
				<meta name='description' content='summary of website' />
			</Head>
			<Header show />
			<MobileNav/>
			<Container marginTop>
				<Row nowrap mHeight>
					<Col ratio='1'>
						<Nav border topSpace='50' />
					</Col>
					
					
					
					<Col border="left" ratio='20' alignItems='center' allowScroll>
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
									}}
								></div>
								<PostFeed posts={posts} />
						</Container>
					</Col>
				</Row>
			</Container>
			<Footer />
		</Layout>
	);
}
