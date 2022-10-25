import React, { useState, useEffect } from "react"
import StoryCreatorPage from "./StoryCreatorPage"
import styles from "./storycreator.module.scss"
import Icon from "./icons/Icon"
import ButtonText from "./button/ButtonText"
import update from "immutability-helper"

const StoryCreator = ({data}) => {
	//Define the initial structure for the story object. Set a placeholder cover at a specific location. This can't be set to the story ID because we don't have that yet.
	let story = {
		pages: [
			{
				number: 0,
				templateName: "cover",
				quadrants: [
					{
						number: 1,
						type: "image",
						span: null,
						content: "/images/placeholders/cover.jpg",
					},
				],
			},
		],
	}

	//Store the whether the story has been created, the id, the title, the object, the page, and the page limit
	const [storyInstantiated, setStoryInstantiated] = useState()
	const [title, updateTitle] = useState()
	const [storyState, updatestoryState] = useState()
	const [page, setPage] = useState(0)
	const [pageCount, setpageCount] = useState()
	const [storyId, setstoryId] = useState()

	useEffect(() => {
		if (!data) {
			console.log("new story useeffect")
			setStoryInstantiated(false)
			updatestoryState({story})
			setpageCount(0)
			setstoryId(0)
		} else{
			console.log(data)
			console.log("existing story useeffect")
			setStoryInstantiated(true)
			updatestoryState(data.page_json)
			setpageCount(data.page_json.story.pages.length-1)
			setstoryId(data.id)
			updateTitle(data.title)
		}
	}, [])

	console.log(storyState)
	//TBD
	//let session = getSession() < get the current session
	//let user = session.user < get the current user from the session
	//let user_id = session.user_id <get the current user_id from the session
	let user_id = 1

	//Run when the "Start story" button is clicked
	function handleStartStory() {
		console.log("ran handleStartStory")
		setStoryInstantiated(true) //Change the state to reflect that the story has been started
		startStory(storyState, user_id) //Run the start story function and pass the logged in user
	}

	function startStory(storyState, user_id) {
		console.log("ran startStory")
		//Sends a story to the database as the logged in user, default story state, and default title
		async function sendToDB() {
			//make sure the path is relative instead of absolute
			const apiUrlEndpoint = "/api/uploadstory-lib"
			const postData = {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					storyjson: storyState,
					title: "new story",
					user: user_id,
				}),
			}
			const response = await fetch(apiUrlEndpoint, postData)
			const res = await response.json()
			setstoryId(res.story.insertId) //Set the story ID to the insertID of the response

			// Assign a default cover
			// async function defaultCover() {
			// 	const endpoint = "/api/generatedefaults-lib"
			// 	const pd = {
			// 		method: "POST",
			// 		headers: { "Content-Type": "application/json" },
			// 		body: JSON.stringify({
			// 			id: res.story.insertId,
			// 			type: "cover",
			// 		}),
			// 	}
			// 	const response = await fetch(endpoint, pd)
			// 	const data = await response.json()
			// 	console.log("data", data)
			// }

			// Create a new directory according to the story ID
			async function createNewDir() {
				const dirId = res.story.insertId
				console.log("createnewdir storyid", dirId)
				const dirPath = `public/images/stories/id${dirId}`
				const apiUrlEndpoint = "/api/makedir-lib"
				const postData = {
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({
						dirPath: dirPath,
					}),
				}

				const response = await fetch(apiUrlEndpoint, postData)
				const data = await response.json()
			}
			createNewDir() //Create the directory
			// defaultCover() //Save the cover file to the directory
		}
		sendToDB()
	}

	function forward() {
		//If the current page is less than the maximum pages, increment the page by one
		if (page < pageCount) {
			setPage(page + 1)
		}
	}
	function backward() {
		//If the current page is greater than 0, decrement the current page by one
		if (page > 0) {
			setPage(page - 1)
		}
	}

	function makeNewPage(storyState) {
		if (pageCount >= 10) return console.log("You have reached the maximum number of pages")

		let newPageDefault = {
			number: pageCount + 1,
			templateName: "uninitialized",
			quadrants: [],
		}
		let upd = update(storyState, {
			story: { pages: { $push: [newPageDefault] } },
		})
		console.log("upd", upd)
		updatestoryState(upd)
		setpageCount(pageCount + 1)
		setPage(pageCount + 1)
	}

	function saveStory(storyState, title, story_id) {
		console.log("trying to save")
		async function sendToDB() {
			const apiUrlEndpoint = "/api/updatestory-lib"
			const postData = {
				method: "Post",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					storyjson: storyState,
					title: title,
					story_id: story_id,
				}),
			}
			const response = await fetch(apiUrlEndpoint, postData)
			const res = await response.json()
			console.log(res)
		}
		sendToDB()
	}

	return (
		<>
			{!storyInstantiated ? (
				<div className={styles.startButton}>
					<div onClick={handleStartStory}>
						<ButtonText color='blue'>Start Your Story</ButtonText>
					</div>
				</div>
			) : (
				<section className={styles.storyCreator}>
					<form>
						{/* hidden button prevents submission on enter behavior */}
						<button
							type='submit'
							disabled
							style={{ display: "none" }}
							aria-hidden='true'></button>
						<label htmlFor='title'>Give your story a title</label>
						<input
							name='title'
							type='text'
							placeholder='Untitled Story'
							onChange={(e) => updateTitle(e.target.value)}
						/>
					</form>
					<div className={styles.body}>
						<StoryCreatorPage
							storyState={storyState}
							page={page}
							title={title}
							updatestoryState={updatestoryState}
							storyId={storyId}
						/>
						<div className={styles.addPage} onClick={() => makeNewPage(storyState)}>
							+
						</div>
					</div>
					<div className={styles.controls}>
						<div onClick={() => saveStory(storyState, title, storyId)}> <ButtonText color="green">Save</ButtonText></div>
						<div onClick={backward}>
							<Icon name='arrow' rotate='180' />
						</div>
						<div onClick={forward}>
							<Icon name='arrow' />
						</div>
					</div>
				</section>
			)}
		</>
	)
}
export default StoryCreator
