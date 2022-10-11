import { useRouter } from "next/router"
import React, { useState, useEffect } from "react"
import BookViewer from "../../components/book/BookViewer"
import Heading from "../../components/Heading"
import Row from "../../components/Row"
import styles from "../../page_sass/bookpreview.module.scss"
import Logo from "../../components/Logo"
import ButtonText from "../../components/button/ButtonText"
import CreatePostDiag from "../../components/CreatePostDiag"

const story = () => {
	const logged_in_user_id = 1 //temporary until authentication is set up
	const [isLoaded, setisLoaded] = useState(0)
	const router = useRouter()
	const { id } = router.query
	const [story, setStory] = useState()
	const [visPostDiag, setvisPostDiag] = useState(false)
	// console.log("story", story)
	useEffect(() => {
		if (!router.isReady) return
		async function getStoryData() {
			// console.log("queried")
			const apiUrlEndpoint = "/api/getstory-lib"
			const postData = {
				method: "Post",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					id: id,
				}),
			}
			const response = await fetch(apiUrlEndpoint, postData)
			const res = await response.json()
			// console.log(res)
			if (res.story.length == 0) {
				// console.log("len 0")
				setStory("invalid")
				return
			}
			setStory(res.story[0])
			setisLoaded(1)
		}
		getStoryData()
	}, [router.query.id, router.isReady])

	function toggleDiag() {
		setvisPostDiag(!visPostDiag)
	}
	if (story == "invalid") {
		return <div>Sorry, {id} is not a valid story ID.</div>
	}
	if (isLoaded == 1) {
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
								id={id}
								user_id={logged_in_user_id}
								setvisPostDiag={setvisPostDiag}
							/>
						) : null}
						<div>
							Comments about this story
						</div>
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
}
export default story
