import { useEffect, useState } from "react"
import styles from "./post.module.scss"
import classNames from "classnames/bind"
import Link from "next/link"
import Heading from "../Heading"
import ExpressionPreview from "../expressions/ExpressionPreview"
import EnterComment from "./EnterComment"
import ImageContainer from "../ImageContainer"

const PostFromFeed = ({ post, counter, comments }) => {
	const [loaded, setLoaded] = useState(true)
	const [comment, setComment] = useState()
	const [showComment, setShowComment] = useState(0)

	// console.log(post)
	const storyCover = `/images/stories/id${post.story_id}/cover.jpg`
	console.log("story cover", storyCover)
	const storyUrl = `/stories/${post.story_id}`
	const authorUrl = `/users/${post.post_user_id}`
	const authorImg = `/images/users/${post.post_user_id}`
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
				{loaded ? (
					<Link href={storyUrl}>
						<a>
							<div style={{ width: "50px", height: "75px" }}>
								<ImageContainer src={storyCover} alt='Story cover' />
							</div>
						</a>
					</Link>
				) : null}
				<ExpressionPreview />
			</div>
			{/* center column containing book title, the post text, and a single comment */}
			<div className={styles.c2}>
				{/* col */}
				<div className={styles.r1}>
					<div>
						{loaded ? (
							<Link href={storyUrl}>
								<a>
									<Heading level='3'>{post.title}</Heading>
								</a>
							</Link>
						) : null}
					</div>
					{/* should link to a specific author's profile */}
					<div>
						{loaded ? (
							<Link href={authorUrl}>
								<a>
									<div
										style={{
											width: "50px",
											height: "75px",
										}}>
										<ImageContainer
											src={authorImg}
											alt="Author's profile image"
										/>
									</div>
								</a>
							</Link>
						) : null}
					</div>
				</div>{" "}
				{/*row1 end*/}
				<div className={styles.r2}>
					{loaded ? (
						<Link href={`/posts/${post.post_id}`}>
							<a>{post.post_text}</a>
						</Link>
					) : null}
				</div>
				{/*row 2 end*/}
				<div className={styles.r3}>
					<div className={styles.commentbody}>
						{loaded ? (
							<Link href={`/posts/${post.post_id}`}>
								<a>
									<Heading level='4'>Comments</Heading>
									{comments.length != 0 ? (
										<span>
											{comments[0].handle}: {comments[0].comment_text}
										</span>
									) : (
										<span>No comments yet.</span>
									)}
								</a>
							</Link>
						) : null}
					</div>
					{/* comment icon that opens and closes the comment box */}
					<div style={{ cursor: "pointer", zIndex: "1" }} onClick={toggleComment}>
						<div style={{ width: "50px", height: "50px" }}>
							{loaded ? (
								<ImageContainer src='/images/comment.jpg' alt='Comment icon' />
							) : null}
						</div>
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
