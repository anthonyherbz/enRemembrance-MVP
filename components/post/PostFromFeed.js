import { useEffect, useState } from "react"
import styles from "./post.module.scss"
import classNames from "classnames/bind"
import Link from "next/link"
import Heading from "../utils/Heading"
import ExpressionPreview from "../expressions/ExpressionPreview"
import EnterComment from "../comment/EnterComment"
import Image from "next/image"

const PostFromFeed = ({
	post,
	counter,
	comments,
	postExpressions,
	storyExpressions,
	expressionTemplates,
}) => {
	// console.log("postexpres", postExpressions)
	// console.log("storyexp", storyExpressions)
	const [loaded, setLoaded] = useState(true)
	// const [comment, setComment] = useState()
	const [showComment, setShowComment] = useState(0)

	// console.log(post)
	const storyCover = `/images/stories/id${post.story_id}/cover.jpg`
	// console.log("story cover", storyCover)
	const storyUrl = `/stories/${post.story_id}`
	const authorUrl = `/users/${post.post_user_id}`
	const authorImg = `/images/users/id${post.post_user_id}.jpg`
	// console.log("post comment", post.comment_text)
	function toggleComment() {
		setShowComment(!showComment)
	}
	return (
		<div key={counter} className={styles.post}>
			{/* <Row> */}
			{/* left-most column containing the book's cover and it's expressions */}
			<div className={styles.c1}>
				{/* col */}
				<Link href={storyUrl}>
					<div style={{ position: "relative", height: "100%", width: "100%" }}>
						<Image
							src={storyCover}
							// width='80'
							// height='100'
							alt='alt'
							fill='true'
						/>
					</div>
				</Link>
				<ExpressionPreview
					parent_id={post.story_id}
					type='story'
					expressions={storyExpressions}
					template={expressionTemplates}
				/>
			</div>
			{/* center column containing book title, the post text, and a single comment */}
			<div className={styles.c2}>
				{/* col */}
				<div className={styles.r1}>
					<div>
						{loaded ? (
							<Link href={storyUrl}>
								<Heading level='3'>{post.title}</Heading>
							</Link>
						) : null}
					</div>
					<div style={{ fontSize: "1rem", position: "relative" }}>
						<ExpressionPreview
							expressions={postExpressions}
							template={expressionTemplates}
							align='right'
							type='post'
							parent_id={post.post_id}
						/>
					</div>
					{/* should link to a specific author's profile */}
					<div style={{ display: "flex", flexDirection: "row" }}>
						{loaded ? (
							<Link href={authorUrl}>
								<div>
									<Image
										src={authorImg}
										width='50'
										height='50'
										object-fit='cover'
										alt='alt'
									/>
								</div>
							</Link>
						) : null}
					</div>
				</div>{" "}
				{/*row1 end*/}
				<div className={styles.r2}>
					{loaded ? <Link href={`/posts/${post.post_id}`}>{post.post_text}</Link> : null}
				</div>
				{/*row 2 end*/}
				<div className={styles.r3}>
					<div className={styles.commentbody}>
						{loaded ? (
							<Link href={`/posts/${post.post_id}`}>
								<Heading level='4'>Comments</Heading>
								{comments.length != 0 ? (
									<span>
										{comments[0].handle}: {comments[0].comment_text}
									</span>
								) : (
									<span>No comments yet.</span>
								)}
							</Link>
						) : null}
					</div>
					{/* comment icon that opens and closes the comment box */}
					<div style={{ cursor: "pointer" }} onClick={toggleComment}>
						<Image
							src={`/images/comment.jpg`}
							width='40'
							height='30'
							alt='alt'
						/>
					</div>
				</div>
				{/*row 3 end*/}
			</div>
			{/* </Row> */}
			{showComment ? (
				<EnterComment toggleComment={toggleComment} post_id={post.post_id} />
			) : null}
		</div>
	)
}
export default PostFromFeed
