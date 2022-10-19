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
import PostSidebar from "../../components/postpage/PostSidebar"

export async function getServerSideProps({ params }) {
	let id = params.id

	try {
		const selectPost =
			"SELECT posts.id AS post_id, CONVERT(posts.post_date, char) AS post_date, posts.story_id, posts.post_text, posts.user_id, stories.title, post_users.handle AS poster_handle, users.handle AS story_author, users.id AS author_id FROM posts LEFT JOIN stories ON posts.story_id = stories.id LEFT JOIN users ON stories.author_id = users.id LEFT JOIN users post_users ON post_users.id = posts.user_id WHERE posts.id = ?;"
		const selectPostExpressions =
			"SELECT posts.id AS post_id, post_expressions.expression_id AS expression_id, post_expressions.count AS count, post_expressions_summary.id AS summary_id, post_expressions_summary.name AS summary_name,  post_expressions_summary.description AS summary_description, post_expressions_summary.image_path AS image_path FROM post_expressions  LEFT JOIN posts ON posts.id=post_expressions.post_id  LEFT JOIN expressions post_expressions_summary ON post_expressions.expression_id=post_expressions_summary.id WHERE post_id = ?  ORDER BY expression_id ASC;"
		const selectComments =
			"SELECT post_comments.post_id AS post_comments_id, post_comments.commentor_id, CONVERT(post_comments.comment_date, char) AS comment_date, post_comments.comment_text, users.handle FROM post_comments LEFT JOIN posts ON post_comments.post_id = posts.id LEFT JOIN users ON post_comments.commentor_id = users.id WHERE post_comments.post_id = ?;"
		const selectStoryExpressions =
			"SELECT stories.id AS story_id, story_expressions.expression_id AS expression_id, story_expressions.count AS count, story_expressions_summary.id AS summary_id, story_expressions_summary.name AS summary_name,  story_expressions_summary.description AS summary_description, story_expressions_summary.image_path AS image_path FROM story_expressions LEFT JOIN stories ON stories.id=story_expressions.story_id  LEFT JOIN expressions story_expressions_summary ON story_expressions.expression_id=story_expressions_summary.id LEFT JOIN posts ON posts.story_id = stories.id WHERE posts.id = ?  ORDER BY expression_id ASC;"
		const selectTemplates = "SELECT id, name, description, image_path FROM expressions"
		const querySql =
			selectPost + selectPostExpressions + selectComments + selectStoryExpressions + selectTemplates
		const valuesParams = [id, id, id, id]
		const data = await multiQuery({ query: querySql, values: valuesParams })
		console.log(data)
		// console.log("d1", data)
		return {
			props: {
				post: data[0],
				postExpressions: data[1],
				comments: data[2],
				storyExpressions: data[3],
				templates: data[4]
			},
		}
	} catch (error) {
		const data = error.message
		console.log(data)
		return { props: { data } }
	}
}

const Post = ({ post, postExpressions, comments, storyExpressions, templates }) => {
	console.log(post, comments, postExpressions, storyExpressions)
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
						<PostSidebar post={post} expressions={storyExpressions} templates={templates} />
						<div onClick={() => history.back()}>
							<ButtonText>Back</ButtonText>
						</div>
					</div>
					<div className={styles.rightcol}>
						<div className={styles.postElement}>
							<div className={styles.peR1}>
								<Heading level='1'>{post.title}</Heading>
								{console.log(postExpressions, post.id, templates)}
								<ExpressionPreview 
								expressions={postExpressions} 
								type='post'
								parent_id={post.post_id}
								template={templates}
								align='right'
								/>
								<div className={styles.per1c}>
									{/* change to jpg */}
									<Image
										width='50'
										height='50'
										src={`/images/users/id${post.user_id}.svg`}
										alt="The post creator's profile image"
									/>
									{post.poster_handle}
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
