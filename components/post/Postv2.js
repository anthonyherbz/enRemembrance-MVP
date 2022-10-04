import { useEffect, useState } from "react"
import styles from "./post.module.scss"
import classNames from "classnames/bind"
import Link from "next/link"
import Heading from "../Heading"
import ExpressionPreview from "../expressions/ExpressionPreview"
import EnterComment from "./EnterComment"
// import { useRouter } from "next/router";

const Postv2 = ({ post, count, hide }) => {
	const [storyResponse, setstoryResponse] = useState([])
	useEffect(() => {
		async function getSingleStory() {
			const apiUrlEndpoint = "/api/getstory-lib"
			const postData = {
				method: "Post",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					id: post.story_id,
				}),
			}
			const response = await fetch(apiUrlEndpoint, postData)
			const res = await response.json()
			console.log("res", res)
			setstoryResponse((storyResponse = res.story[0]))
			console.log("storyResponse", storyResponse)
		}
		getSingleStory()
		// console.log("Story response ", storyResponse)
	}, [])

	const [showComment, setShowComment] = useState(0)
	function toggleComment() {
		setShowComment(!showComment)
	}
	let cx = classNames.bind(styles)
	let commentAuthor = ""
	let comment = ""
	let postClasses = cx({
		hide: hide,
	})

	if (storyResponse == undefined) {
		//basic error handling
		return <div>No story returned for post_id {post.id}</div>
	}
	return (
		<div key={count} className={styles.post}>
			{/* <Row> */}
			{/* left-most column containing the book's cover and it's expressions */}
			<div className={styles.c1}>
				{/* col */}
				<Link href={`/stories/${storyResponse.id}`}>
					<a>
						<img
							src={`/images/covers/placeholder${post.story_id}.jpg`}
							alt='placeholder'
						/>
					</a>
				</Link>
				<ExpressionPreview />
			</div>
			{/* center column containing book title, the post text, and a single comment */}
			<div className={styles.c2}>
				{/* col */}
				<div className={styles.r1}>
					<div>
						<Link href={`/stories/${storyResponse.id}`}>
							<a>
								<Heading level='3'>
									{storyResponse.title}
								</Heading>
							</a>
						</Link>
					</div>
					{/* should link to a specific author's profile */}
					<div className={postClasses}>
						<Link href={`/users/${storyResponse.author_id}`}>
							<a>
								<img
									src={`/images/users/${storyResponse.author_id}.jpg`}
								/>
							</a>
						</Link>
					</div>
				</div>{" "}
				{/*row1 end*/}
				<div className={styles.r2}>
					<Link href={`/posts/${post.id}`}>
						<a>{post.post_text}</a>
					</Link>
				</div>{" "}
				{/*row 2 end*/}
				<div className={styles.r3}>
					<div className={styles.commentbody}>
						<Link href={`/posts/${post.id}`}>
							<a>
								<Heading level='4'>Comments</Heading>
								{commentAuthor}: {comment}
							</a>
						</Link>
					</div>
					{/* comment icon that opens and closes the comment box */}
					<div
						style={{ cursor: "pointer", zIndex: "1" }}
						className={postClasses}
						onClick={toggleComment}>
						<img src='/images/comment.jpg' alt='placeholder' />
					</div>
				</div>{" "}
				{/*row 3 end*/}
			</div>
			{/* </Row> */}
			{showComment ? (
				<EnterComment
					toggleComment={toggleComment}
					showComment={showComment}
					setShowComment={setShowComment}
				/>
			) : null}
		</div>
	)
}
export default Postv2
