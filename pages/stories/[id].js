import React, { useState } from "react"
import BookViewer from "../../components/book/BookViewer"
import Heading from "../../components/Heading"
import Row from "../../components/Row"
import styles from "../../page_sass/bookpreview.module.scss"
import Logo from "../../components/Logo"
import ButtonText from "../../components/button/ButtonText"
import CreatePostDiag from "../../components/CreatePostDiag"
import ExpressionPreview from "../../components/expressions/ExpressionPreview"
import ImageContainer from "../../components/ImageContainer"

import { multiQuery } from "../../lib/db"
import CommentFeed from "../../components/comment/CommentFeed"
import EnterComment from "../../components/EnterComment"

//needs to check jwt
export async function getServerSideProps({ params }) {
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
		// console.log("d1", data[0][0])
		// console.log("d2", data[1])
		// console.log("data", data)
		return { props: { data } }
	} catch (error) {
		const data = error.message
		console.log(data)
		return { props: { data } }
	}
}

const Story = ({ data }) => {
	const logged_in_user_id = 1 //temporary until authentication is set up
	const expressions = data[1]
	const templates = data[3]
	const comments = data[2]
	function toggleComment() {
		setShowComment(!showComment)
	}
	const [story, setStory] = useState(data[0][0])
	const [showComment, setShowComment] = useState(false)
	if (story.length == 0) {
		setStory("invalid")
		return
	}
	const [visPostDiag, setvisPostDiag] = useState(false)

	function toggleDiag() {
		setvisPostDiag(!visPostDiag)
	}
	if (story == "invalid") {
		return <div>Sorry, {id} is not a valid story ID.</div>
	}
	return (
		<div className={styles.bookPreview}>
			<div className={styles.displayMobile}>
				<Logo size='1-5x' />
				<Heading level='1'>{story.title}</Heading>
			</div>
			<div className={styles.colleft}>
				<div className={styles.hideMobile}>
					<Logo size='1-5x' />
				</div>
				<div className={styles.bookContent}>
					<div className={styles.hideMobile}>
						<Heading level='1'>{story.title}</Heading>
					</div>
					<Row>Created on {story.create_date}</Row>
					<Row>By {story.handle}</Row>
					<div onClick={() => toggleDiag()}>
						<ButtonText color='green'>Post about this story</ButtonText>
					</div>
					{visPostDiag ? (
						<CreatePostDiag
							id={story.id}
							user_id={logged_in_user_id}
							setvisPostDiag={setvisPostDiag}
						/>
					) : null}
					<div>
						<ExpressionPreview
							type='story'
							expressions={expressions}
							align='left'
							template={templates}
							parent_id={story.id}
						/>
					</div>
					<div
						onClick={toggleComment}
						style={{ width: "20px", height: "20px", cursor: "pointer" }}>
						<ImageContainer src='/images/comment.jpg' alt='Comment icon' />
					</div>
					{showComment ? (
						<EnterComment toggleComment={toggleComment} story_id={story.id} />
					) : null}
					<CommentFeed comments={comments} stacked={true}/>
				</div>
				<div onClick={() => history.back()}>
					<ButtonText path='/' color='blue'>
						Back
					</ButtonText>
				</div>
			</div>
			<div className={styles.colright}>
				<BookViewer story={story} />
			</div>
		</div>
	)
}
export default Story
