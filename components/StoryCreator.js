import React, { useState } from "react"
import StoryCreatorPage from "./StoryCreatorPage"
import styles from "./storycreator.module.scss"
import Icon from "./icons/Icon"
import ButtonText from "./button/ButtonText"
import update from "immutability-helper"

const StoryCreator = () => {
	//Define the initial structure for the story object. Set a placeholder cover at a specific location.
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
	const [storyInstantiated, setStoryInstantiated] = useState(false)
	const [title, updateTitle] = useState()
	const [storyState, updatestoryState] = useState({ story })
	const [page, setPage] = useState(0)
	const [pageCount, setpageCount] = useState(0)
	const [storyId, setstoryId] = useState(0)

	//TBD
	//let session = getSession() < get the current session
	//let user = session.user < get the current user from the session
	//let user_id = session.user_id <get the current user_id from the session
	let user_id = 1

	function handleStartStory() {
		console.log("ran handleStartStory")
		setStoryInstantiated(true)
		startStory(storyState, user_id)
	}
	function startStory(storyState, user_id) {
		console.log("ran startStory")
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
			setstoryId(res.story.insertId)
			async function defaultCover(){
				const endpoint = "/api/generatedefaults-lib"
				const pd = {
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({
						id: res.story.insertId,
						type: "cover"
					}),
				}
				const response = await fetch(endpoint, pd)
				const data = await response.json()
				console.log("data", data)
			}
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
				// console.log("diretory data", data)
			}
			createNewDir()
			defaultCover()
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
		console.log("ran makeNewPage")
		// if (pageCount > 0) {
		// 	saveStory(storyState, title, story_id);
		// }
		if (pageCount >= 10)
			return console.log("You have reached the maximum number of pages")

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

		//REPLACED
		// storyState.story.pages.push({
		// 	number: pageCount + 1,
		// 	templateName: "uninitialized",
		// 	quadrants: [],
		// })
		setpageCount(pageCount + 1)
		setPage(pageCount + 1)
	}

	function saveStory(storyState, title, story_id) {
		console.log("trying to save")
		let story = storyState.story
		console.log("story1111", storyState)
		async function sendToDB() {
			const apiUrlEndpoint = "/api/updatestory-lib";
			const postData = {
				method: "Post",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					storyjson: storyState,
					title: title,
					story_id: story_id
				}),
			};
			const response = await fetch(apiUrlEndpoint, postData);
			const res = await response.json();
			console.log(res);
		}
		sendToDB();
	} 
	
	return (
		<>
			{!storyInstantiated ? (
				<div className={styles.startButton} >
					<div onClick={handleStartStory}><ButtonText color='blue'>Start Your Story</ButtonText></div>
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
						{/* {console.log("changed title", title)} */}
					</form>
					<div className={styles.body}>
						<StoryCreatorPage
							// makeNewPage={makeNewPage}
							storyState={storyState}
							// forward={forward}
							page={page}
							title={title}
							updatestoryState={updatestoryState}
							storyId={storyId}
						/>
						<div
							className={styles.addPage}
							onClick={() => makeNewPage(storyState)}>
							+
						</div>
					</div>
					<div className={styles.controls}>
						<button onClick={ () => saveStory(storyState, title, storyId)}>save to db</button>
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