import React, { useState } from "react"
import BookViewer from "../../components/story/viewer/BookViewer"
import Heading from "../../components/utils/Heading"
import styles from "../../page_sass/viewer.module.scss"
import Logo from "../../components/utils/Logo"
import CreatePostDiag from "../../components/post/CreatePostDiag"
import ExpressionPreview from "../../components/expressions/ExpressionPreview"
import { multiQuery } from "../../lib/db"
import CommentFeed from "../../components/comment/CommentFeed"
import EnterComment from "../../components/comment/EnterComment"
import getUser from "../../lib/getUser"
import { UserContext } from "../_app"
import { useContext, useEffect } from "react"
import Image from "next/image"
import Head from "next/head"

export async function getServerSideProps({ params, req }) {
	const { userID, handle } = await getUser(req)

	const id = params.id
	try {
		const selectStory =
			"SELECT stories.id, stories.author_id, stories.title, CONVERT(stories.create_date, char) as create_date, CONVERT(stories.publish_date, char) as publish_date, stories.published, stories.visible, stories.monetized, stories.page_json, story_users.id AS user_id, story_users.handle AS handle FROM stories LEFT JOIN users story_users ON stories.author_id = story_users.id WHERE stories.id = ?;"
		const selectExpressions =
			"SELECT stories.id AS story_id, story_expressions.expression_id AS expression_id, story_expressions.count AS count, story_expressions_summary.id AS summary_id, story_expressions_summary.name AS summary_name,  story_expressions_summary.description AS summary_description, story_expressions_summary.image_path AS image_path FROM story_expressions  LEFT JOIN stories ON stories.id=story_expressions.story_id  LEFT JOIN expressions story_expressions_summary ON story_expressions.expression_id=story_expressions_summary.id WHERE story_id = ?  ORDER BY expression_id ASC;"
		const selectTemplates = "SELECT id, name, description, image_path FROM expressions;"
		const selectComments =
			"SELECT story_comments.story_id, story_comments.commentor_id, users.handle AS handle, CONVERT(story_comments.comment_date, char) AS comment_date, story_comments.comment_text FROM story_comments LEFT JOIN users ON users.id = story_comments.commentor_id WHERE story_id = ?;"
		const querySql = selectStory + selectExpressions + selectComments + selectTemplates
		const valuesParams = [id, id, id]
		const data = await multiQuery({ query: querySql, values: valuesParams })
		return { props: { data, userID, handle, id } }
	} catch (error) {
		const data = error.message
		// console.log(data)
		return { props: { data } }
	}
}

const Story = ({ data, userID, handle, id }) => {
	//initialize logged in user context
	const { loggedInUser, setLoggedInUser } = useContext(UserContext)
	useEffect(() => {
		setLoggedInUser({ userID, handle })
	}, [handle, setLoggedInUser, userID])
	//extract expressions, templates, comments from data
	const expressions = data[1]
	const templates = data[3]
	const comments = data[2]

	//states
	const [story, setStory] = useState(data[0][0])
	const [showComment, setShowComment] = useState(false)
	const [visPostDiag, setvisPostDiag] = useState(false)

	//functions
	function toggleComment() {
		//comment entry box
		setShowComment(!showComment)
	}
	function toggleDiag() {
		//post entry box
		setvisPostDiag(!visPostDiag)
	}
	// console.log(story)

	if (!story || story.length == 0) {
		setStory("invalid")
		return
	}
	if (story == "invalid") {
		return <div>Sorry, {id} is not a valid story ID.</div>
	}
	return (
		<div className={styles.viewer}>
			<Head>
			<title>enRemembrance</title>
				<link rel='icon' href='/images/icons/logo_temp_blue.svg' />
				<meta name='description' content='summary of website' />
			</Head>
			{/* Mobile logo and title */}
			<div className={styles.headerMobile}>
				<Logo size='1-5x' />
				<Heading level='2'>{story.title}</Heading>
			</div>
			<div className={styles.splitPage}>
				<div className={styles.colLeft}>
					{/* Desktop Logo */}
					<div className={styles.headerDesktop}>
						<Logo size='1-5x' />
					</div>
					<div className={styles.storyInfo}>
						{/* Desktop Title */}
						<div className={styles.headerDesktop}>
							<Heading level='1'>{story.title}</Heading>
						</div>
						<div className={styles.infoRow1}>
							<div>Created on {story.create_date.split(" ", [1])} </div>
							<div>By {story.handle}</div>
							<div onClick={() => toggleDiag()}>
								<button>Post about this story</button>
							</div>
						</div>
						<div className={styles.infoRow2}>
							{visPostDiag ? (
								<CreatePostDiag
									id={story.id}
									user_id={loggedInUser.userID}
									setvisPostDiag={setvisPostDiag}
								/>
							) : null}
							<div className={styles.exp}>
								<ExpressionPreview
									type='story'
									expressions={expressions}
									align='left'
									template={templates}
									parent_id={story.id}
								/>
							</div>
							<div onClick={toggleComment} style={{ cursor: "pointer" }}>
								<span style={{ display: "flex", alignItems:"center", cursor: "pointer" }}>
									<Image
										src='/images/comment.jpg'
										alt='Comment icon'
										width='35'
										height='30'
									/>
									<span style={{fontSize: "0.8em"}}>Comment on this story.</span>
								</span>
							</div>
							{showComment ? (
								<EnterComment toggleComment={toggleComment} story_id={story.id} />
							) : null}
						</div>
						<div className={styles.infoRow3}>
							<span className={styles.commentSidebar}><CommentFeed comments={comments} stacked={true} /></span>
							<span className={styles.commentLimited}><CommentFeed comments={comments} stacked={true} limit/></span>
							<div onClick={() => history.back()}>
							<button>Back</button>
						</div>
					</div>
					</div>
				</div>
				<div className={styles.colRight}>
					<BookViewer story={story} />
				</div>
			</div>
		</div>
	)
}
export default Story
