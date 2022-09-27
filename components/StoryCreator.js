import React, { useState, useEffect } from "react";
import StoryCreatorPage from "./StoryCreatorPage";
import styles from "./storycreator.module.scss";
import Image from "next/image";
import Icon from "./icons/Icon";

const StoryCreator = () => {
	let story = {
		pages: [
			{
				number: 0,
				templateName: "cover",
				positions: 1,
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
	//TBD
	//let session = getSession()
	//let user = session.user
	//let user_id = session.user_id
	let user_id = 1;
	let coverpath;
	let visible = 0;
	let published = 0;
	let monetized = 0;

	//Store the story in state
	const [title, updateTitle] = useState();
	const [storyState, updatestoryState] = useState({ story });
	//Store the current page in state
	const [page, setPage] = useState(0);
	//Store the maximum number of pages in state
	const [pageCount, setpageCount] = useState(0);
	console.log("Page number ", page);
	console.log("page max", pageCount);
	console.log(storyState);
	//If the current page is less than the maximum pages, increment the page by one
	function forward() {
		if (page < pageCount) {
			setPage(page + 1);
		}
	}
	//If the current page is greater than 0, decrement the current page by one
	function backward() {
		if (page > 0) {
			setPage(page - 1);
		}
	}
	function makeNewPage(storyState) {
		setPage(page+1)
		//Do not update state directly
		let myStory = storyState;
		console.log("mystory is", myStory)
		//Set the maximum number of pages as 10 and log to the console if this count is reached
		if (pageCount >= 10)
			return console.log("You have reached the maximum number of pages");
		//Check the intial page count before running the function
		console.log("intial pageCount", pageCount);

		//populate placeholder variables
		let templateName = "uninitialized";
		let positions = 0;
		let quadrants = [];

		//Into the first item in the .pages array, push
		myStory.story.pages.push({
			//one higher than the page count. Averts issue of duplicate page numbers
			//Create quadrants as an empty array
			number: pageCount + 1,
			templateName: templateName,
			positions: positions,
			quadrants: quadrants,
		});
		// console.log("myStory.story.pages", myStory.story.pages)

		//Increment over the specified number of positions
		for (let i = 0; i < positions; i++) {
			//Log the contents of each quadrant
			console.log(quadrants[i]);
			//In my story, story, pages, one higher than the current maximum number of pages, in quadrants, add a new object into the array
			myStory.story.pages[pageCount + 1].quadrants.push({
				number: quadrants[i].number,
				type: quadrants[i].type,
				span: quadrants[i].span,
				content: quadrants[i].content,
			});
		}
		// console.log("Story with new page added: ", story)
		// console.log("page number after adding new", page)
		setpageCount(pageCount + 1);
		// console.log("final page count", pageCount)
		// return myStory;
		//Update story state when the job is done. Unclear if this is actually doing anything.
		updatestoryState(myStory);
	}
	function saveStory(storyState) {
		let myStory = storyState;
		async function sendToDB() {
			const apiUrlEndpoint = "http://localhost:3000/api/uploadstory-lib";
			const postData = {
				method: "Post",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					storyjson: myStory,
					title: title,
					published: published,
					visible: visible,
					monetized: monetized,
					user: user_id,
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
			<section className={styles.storyCreator}>
				<form>
					{/* hidden button prevents submission on enter behavior */}
					<button type="submit" disabled style={{display: "none"}} aria-hidden="true"></button>
					<label htmlFor='title'>Give your story a title</label>
					<input
						name='title'
						type='text'
						placeholder='Untitled Story'
						onChange={(e) => updateTitle(e.target.value)}
					/>
					{console.log("changed title", title)}
				</form>
				<div className={styles.body}>
					<StoryCreatorPage
						makeNewPage={makeNewPage}
						workingStory={storyState}
						forward={forward}
						page={page}
						title={title}
					/>
					<span onClick={() => makeNewPage(storyState)}>+</span>
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

			<section style={{display: "none"}}>
				<div onClick={() => makeNewPage(storyState)}>
					Click me to create a new page
				</div>
				<div onClick={forward}>Click me to navigate forward</div>
				<div onClick={backward}>Click me to navigate backwards</div>
				<div onClick={() => saveStory(storyState)}>
					Click me to save the story into the database
				</div>
			</section>
		</>
	);
};
export default StoryCreator;
