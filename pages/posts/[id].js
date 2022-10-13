import ImageContainer from "../../components/ImageContainer"
import styles from "../../page_sass/postpage.module.scss"
import CommentFeed from "../../components/comment/CommentFeed"
import Heading from "../../components/Heading"
import Image from "next/image"
import Link from "next/link"
import ButtonText from "../../components/button/ButtonText"
import Logo from "../../components/Logo"
import ExpressionPreview from "../../components/expressions/ExpressionPreview"
import { multiQuery } from "../../lib/db"

export async function getServerSideProps({ params }) {
	let id = params.id
	console.log("pid", id)
	try {
		const query1 =
			"SELECT posts.post_text, posts.id AS post_id, CONVERT(posts.post_date, char) AS post_date, post_users.handle AS post_user_handle, post_users.id AS post_user_id, stories.title, stories.id AS story_id, CONVERT(stories.publish_date, char) AS story_publish_date, post_expressions.expression_id AS post_expressions_id, post_expressions.count AS post_expressions_count,story_expressions.expression_id AS story_expressions_id, story_expressions.count AS story_expressions_count,post_expressions_summary.id AS post_expressions_summary_id, post_expressions_summary.name AS post_expressions_summary_name, post_expressions_summary.description AS post_expressions_summary_description, post_expressions_summary.image_path AS post_expressions_summary_image_path,story_expressions_summary.id AS story_expressions_summary_id, story_expressions_summary.name AS story_expressions_summary_name, story_expressions_summary.description AS story_expressions_summary_description, story_expressions_summary.image_path AS story_expressions_summary_image_path FROM posts LEFT JOIN users post_users ON posts.user_id=post_users.id LEFT JOIN stories ON posts.story_id=stories.id  LEFT JOIN post_expressions ON posts.id=post_expressions.post_id LEFT JOIN story_expressions ON stories.id=story_expressions.story_id LEFT JOIN expressions post_expressions_summary ON post_expressions.expression_id=post_expressions_summary.id LEFT JOIN expressions story_expressions_summary ON story_expressions.expression_id=story_expressions_summary.id WHERE posts.id = ?;"
		const query2 =
			"SELECT post_comments.post_id AS post_comments_id, post_comments.commentor_id, CONVERT(post_comments.comment_date, char) AS comment_date, post_comments.comment_text, users.handle FROM post_comments LEFT JOIN posts ON post_comments.post_id = posts.id LEFT JOIN users ON post_comments.commentor_id = users.id WHERE post_comments.post_id = ?;"
		const querySql = query1 + query2
		const valuesParams = [id, id]
		const data = await multiQuery({ query: querySql, values: valuesParams })
		console.log("d1", data)
		return { props: { post: data[0], comments: data[1] } }
	} catch (error) {
		const data = error
		console.log(data)
		return { props: { data } }
	}
}

const Post = ({ post, comments }) => {
	console.log(post, comments)
	const logged_in_user_id = 1 //temporary until authentication is set up
	post = post[0]
	console.log("post", post)
	return (
		<>
			<div className={styles.postPage}>
				<Logo size='1-5x' />
				<div className={styles.mobileButton}>
					<div onClick={() => history.back()}>
						<ButtonText>Back</ButtonText>
					</div>
				</div>
				<div className={styles.body}>
					<div className={styles.leftcol}>
						<div className={styles.bookElement}>
							<div className={styles.bookCover}>
								<Link href={`/stories/${post.story_id}`}>
									<a>
										<ImageContainer
											src={`/images/stories/id${post.story_id}/cover.jpg`} alt="The story's cover image"
										/>
									</a>
								</Link>
							</div>
							<div>
								{/* to be replaced */}
								<ExpressionPreview />
							</div>
							<div>
								{/* should technically be about the published 0/1 but */}
								{post.story_publish_date != undefined
									? post.story_publish_date
									: "Not published"}
							</div>
							<div className={styles.info}>
								<ul>
									<li>
										<Link href={`/stories/${post.story_id}`}>
											<a>View Story</a>
										</Link>
									</li>
									<li>Buy Story</li>
								</ul>
							</div>
						</div>
						<div onClick={() => history.back()}>
							<ButtonText>Back</ButtonText>
						</div>
					</div>
					<div className={styles.rightcol}>
						<div className={styles.postElement}>
							<div className={styles.peR1}>
								<Heading level='1'>{post.title}</Heading>
								<ExpressionPreview />
								<div className={styles.per1c}>
									{/* change to jpg */}
									<Image
										width='50'
										height='50'
										src={`/images/users/id${post.post_user_id}.svg`}
										alt="The post creator's profile image"
									/>
									{post.post_user_handle}
								</div>
							</div>
							<div className={styles.peR2}>{post.postContent}</div>
							<div className={styles.mobileRow}>
								<div className={styles.mobileCover}>
									<Link href='/book'>
										<a>
											<ImageContainer
												src={`/images/stories/id${post.story_id}/cover.jpg`}
												alt="The story's cover image"
											/>
										</a>
									</Link>
								</div>
								<div className={styles.info}>
									<ul>
										{post.story_publish_date != undefined ? (
											<li>Published: {post.story_publish_date}</li>
										) : (
											<li>Not published</li>
										)}
										<li>
											<Link href={`/stories/${post.story_id}`}>
												<a>View Book</a>
											</Link>
										</li>
										<li>
											<Link href={`/buy`}>
												<a>Buy Book</a>
											</Link>
										</li>
									</ul>
								</div>
							</div>
						</div>
						<CommentFeed comments={comments} />
					</div>
				</div>
			</div>
		</>
	)
}
export default Post
