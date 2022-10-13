import React, { useState } from "react"
import BookViewer from "../../components/book/BookViewer"
import Heading from "../../components/Heading"
import Row from "../../components/Row"
import styles from "../../page_sass/bookpreview.module.scss"
import Logo from "../../components/Logo"
import ButtonText from "../../components/button/ButtonText"
import CreatePostDiag from "../../components/CreatePostDiag"

import { query } from "../../lib/db"
export async function getServerSideProps({ params }) {
	const id = params.id
	try {
		const querySql =
			"SELECT stories.id, stories.author_id, stories.title, CONVERT(stories.create_date, char) as create_date, CONVERT(stories.publish_date, char) as publish_date, stories.published, stories.visible, stories.monetized, stories.page_json, story_users.id AS user_id, story_users.handle AS handle FROM stories LEFT JOIN users story_users ON stories.author_id = story_users.id WHERE stories.id = ?"
		const valuesParams = [id]
		const data = await query({ query: querySql, values: valuesParams })
		console.log("d1", data[0])
		return { props: { data } }
	} catch (error) {
		const data = error
		console.log(data)
		return { props: { data } }
	}
}

const Story = ({ data }) => {
	const logged_in_user_id = 1 //temporary until authentication is set up

	const [story, setStory] = useState(data[0])
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
					<div>Comments about this story</div>
				</div>
				<ButtonText path='/' color='blue'>
					Back
				</ButtonText>
			</div>
			<div className={styles.colright}>
				<BookViewer story={story} />
			</div>
		</div>
	)
}
export default Story
