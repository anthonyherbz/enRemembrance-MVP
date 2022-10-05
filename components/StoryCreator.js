import React, { useState } from "react";
import StoryCreatorPage from "./StoryCreatorPage";
import styles from "./storycreator.module.scss";
import Icon from "./icons/Icon";
import ButtonText from "./button/ButtonText";

const StoryCreator = () => {
	//Define the initial structure for the story object. Set a placeholder cover at a specific location.
	//DONE
	
	let story = {
		id: 0,
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
	};

	//Store the whether the story has been created, the id, the title, the object, the page, and the page limit
	const [storyInstantiated, setStoryInstantiated] = useState(false);
	const [title, updateTitle] = useState();
	const [storyState, updatestoryState] = useState({ story });
	const [page, setPage] = useState(0);
	const [pageCount, setpageCount] = useState(0);
	// console.log("story after id update", storyState)

	//TBD
	//let session = getSession() < get the current session
	//let user = session.user < get the current user from the session
	//let user_id = session.user_id <get the current user_id from the session
	let user_id = 1;


	function handleStartStory() {
		console.log("ran handleStartStory");
		setStoryInstantiated(true);
		startStory(storyState, user_id);
	}

	function forward() {
		//If the current page is less than the maximum pages, increment the page by one
		if (page < pageCount) {
			setPage(page + 1);
		}
	}
	function backward() {
		//If the current page is greater than 0, decrement the current page by one
		if (page > 0) {
			setPage(page - 1);
		}
	}

	function makeNewPage(storyState) {
		console.log("ran makeNewPage");
		// if (pageCount > 0) {
		// 	saveStory(storyState, title, story_id);
		// }
		if (pageCount >= 10)
			return console.log("You have reached the maximum number of pages");

		//Into the first item in the .pages array, push
		storyState.story.pages.push({
			number: pageCount + 1,
			templateName: "uninitialized",
			quadrants: [],
		});
		setpageCount(pageCount + 1);
		setPage(pageCount + 1);

		// updatestoryState(myStory);
	}

	function startStory(storyState, user_id) {
		console.log("ran startStory");
		const myStory = storyState;
		async function sendToDB() {
			//make sure the path is relative instead of absolute
			const apiUrlEndpoint = "/api/uploadstory-lib";
			const postData = {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					storyjson: myStory,
					title: "new story",
					user: user_id,
				}),
			};
			const response = await fetch(apiUrlEndpoint, postData);
			const res = await response.json();
			// console.log("res story", res.story.insertId);
			updatestoryState(current => {
				return {
					...current,
					story :{
						...current.story,
						id: res.story.insertId
					}
				}
			})

			// console.log("res", res);
			async function createNewDir() {
				const testId = res.story.insertId;
				console.log("createnewdir storyid", testId);
				const dirPath = `public/images/stories/id${testId}`;
				const apiUrlEndpoint = "/api/makedir-lib";
				const postData = {
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({
						dirPath: dirPath,
					}),
				};

				const response = await fetch(apiUrlEndpoint, postData);
				const data = await response.json();
				// console.log("diretory data", data);
			}
			createNewDir();
		}
		sendToDB();
	}
	/* function saveStory(storyState, title, story_id) {
		const story = storystate.story
		async function sendToDB() {
			const apiUrlEndpoint = "/api/updatestory-lib";
			const postData = {
				method: "Post",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					storyjson: story,
					title: title,
					story_id: story_id
				}),
			};
			const response = await fetch(apiUrlEndpoint, postData);
			const res = await response.json();
			const insertId = res.story.insertId
			console.log(res);
		}
		sendToDB();
	}  */
	return (
		<>
			{!storyInstantiated ? (
				<div onClick={handleStartStory}>
					<ButtonText color='blue'>Start Your Story</ButtonText>
				</div>
			) : (
				<section className={styles.storyCreator}>
					<form>
						{/* hidden button prevents submission on enter behavior */}
						<button
							type='submit'
							disabled
							style={{ display: "none" }}
							aria-hidden='true'
						></button>
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
							makeNewPage={makeNewPage}
							storyState={storyState}
							forward={forward}
							page={page}
							title={title}
							updatestoryState={updatestoryState}
							storyId={storyState.story.id}
						/>
						<div
							className={styles.addPage}
							onClick={() => makeNewPage(storyState)}
						>
							+
						</div>
					</div>
					<div className={styles.controls}>
						<div onClick={backward}>
							<Icon name='arrow' rotate='180' />
						</div>
						<div onClick={forward}>
							<Icon name='arrow' />
						</div>
					</div>
				</section>
			)}

			{/* <section style={{ display: "none" }}>
				<div onClick={() => makeNewPage(storyState)}>
					Click me to create a new page
				</div>
				<div onClick={forward}>Click me to navigate forward</div>
				<div onClick={backward}>Click me to navigate backwards</div>
				<div onClick={() => startStory(storyState)}>
					Click me to save the story into the database
				</div>
			</section> */}
		</>
	);
};
export default StoryCreator;

// const directory = `images/stories/id${storyId}`;
// const dir = fs.ensureDir(directory, (err) => {
// console.log(err);
// });
