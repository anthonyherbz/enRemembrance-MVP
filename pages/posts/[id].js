import ImageContainer from "../../components/ImageContainer"
import styles from "../../page_sass/postpage.module.scss"
import CommentFeed from "../../components/comment/CommentFeed"
import Heading from "../../components/Heading"
import Image from "next/image"
import Link from "next/link"
import ButtonText from "../../components/button/ButtonText"
import Logo from "../../components/Logo"
import ExpressionPreview from "../../components/expressions/ExpressionPreview"
import { useRouter } from "next/router"
import React, { useState, useEffect } from "react"
import { getComments } from "../api/api"

const Post = () => {
	const logged_in_user_id = 1 //temporary until authentication is set up
	const [isLoaded, setisLoaded] = useState(0)
	const router = useRouter()
	const { id } = router.query
	const [post, setPost] = useState()
	const [comments, setComments] = useState()
	// const comments = getComments()
	// console.log(post)

	useEffect(() => {
		if (!router.isReady) return
		async function getPostData() {
			// console.log("queried")
			const apiUrlEndpoint = "/api/getpost-lib"
			const postData = {
				method: "Post",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					post_id: id,
				}),
			}
			const response = await fetch(apiUrlEndpoint, postData)
			const res = await response.json()
			// console.log(res)
			if (res.post.length == 0) {
				// console.log("len 0")
				setPost("invalid")
				return
			}
			// console.log(res.post[0])
			setPost(res.post[0])
			setComments(res.comments)
			setisLoaded(1)
		}
		getPostData()
	}, [router.query.id, router.isReady])

	if (post == "invalid") {
		return <div>This is not a valid post ID</div>
	}

	if (isLoaded == 1) {
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
												src={`/images/stories/id${post.story_id}/cover.jpg`}
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
											<li><Link href={`/buy`}>
													<a>Buy Book</a>
												</Link></li>
										</ul>
									</div>
								</div>
							</div>
							<CommentFeed comments={comments}/>
						</div>
					</div>
				</div>
			</>
		)
	}
}
export default Post
