import Head from "next/head"
import Layout from "../components/Layout"
import Col from "../components/Col"
import { multiQuery } from "../lib/db"
import Row from "../components/Row"
import Header from "../components/header/Header"
import Footer from "../components/Footer"
import Container from "../components/Container"
import Nav from "../components/Nav"
import MobileNav from "../components/MobileNav"
import PostFeedv2 from "../components/post/PostFeedv2"

export async function getServerSideProps({ params }) {
	try {
		const valuesParams = []
		const selectPosts =
			"SELECT posts.post_text, posts.id AS post_id, CONVERT(posts.post_date, char) as post_date, post_users.handle AS post_user_handle, post_users.id AS post_user_id, stories.title, stories.id AS story_id, CONVERT(stories.publish_date, char) AS story_publish_date FROM posts LEFT JOIN users post_users ON posts.user_id=post_users.id LEFT JOIN stories ON posts.story_id=stories.id;"
		const selectComments =
			"SELECT post_comments.post_id AS post_comments_id, post_comments.commentor_id, CONVERT(post_comments.comment_date, char) AS comment_date, post_comments.comment_text, users.id AS user_id, users.handle FROM post_comments LEFT JOIN posts ON post_comments.post_id = posts.id LEFT JOIN users ON post_comments.commentor_id = users.id;"
		const selectPostExpressions =
			"SELECT posts.id AS post_id, post_expressions.expression_id AS expression_id, post_expressions.count AS count, post_expressions_summary.id AS summary_id, post_expressions_summary.name AS summary_name,  post_expressions_summary.description AS summary_description, post_expressions_summary.image_path AS image_path FROM posts  LEFT JOIN post_expressions ON posts.id=post_expressions.post_id  LEFT JOIN expressions post_expressions_summary ON post_expressions.expression_id=post_expressions_summary.id ORDER BY expression_id ASC;"
		const selectStoryExpressions =
			"SELECT stories.id AS story_id, story_expressions.expression_id AS expression_id, story_expressions.count AS count, story_expressions_summary.id AS summary_id, story_expressions_summary.name AS summary_name,  story_expressions_summary.description AS summary_description, story_expressions_summary.image_path AS image_path FROM story_expressions  LEFT JOIN stories ON stories.id=story_expressions.story_id  LEFT JOIN expressions story_expressions_summary ON story_expressions.expression_id=story_expressions_summary.id ORDER BY expression_id ASC;"
		const querySql =
			selectPosts + selectComments + selectPostExpressions + selectStoryExpressions
		const data = await multiQuery({ query: querySql, values: valuesParams })
		return { props: { data } }
	} catch (error) {
		const data = error.message
		console.log(data)
		return { props: { data } }
	}
}

export default function Home({ data }) {
	// console.log(data)
	const posts = data[0]
	const comments = data[1]
	const postExpressions = data[2]
	const storyExpressions = data[3]
	console.log("SE",storyExpressions)
	// console.log(posts, comments)
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
					<Col border='left' ratio='20' alignItems='center' allowScroll>
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
							<div style={{paddingBottom: "10px"}}>
								<PostFeedv2
									posts={posts}
									comments={comments}
									storyExpressions={storyExpressions}
									postExpressions={postExpressions}
								/>
							</div>
						</Container>
					</Col>
				</Row>
			</Container>
			<Footer />
		</Layout>
	)
}
