import React, { useState, useEffect } from "react";
import PostFeedv2 from "../components/post/PostFeedv2";
import Postv3 from "../components/post/Postv3";

function createStory() {
	let cover = "/images/placeholders/cover.jpg";
	// let backCover = "/images/stories/1/backcover";
	// let count = 0;
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
						content: cover,
					},
				],
			},
		],
	};

	return story;
}

const Testing = ({ data }) => {
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
						content: "/images/placeholders/cover.jpg"
					},
				],
			},
		],
	};
	const [storyState, updatestoryState] = useState({story})
	// console.log("Story Initialized: ", storyState);

	const [page, setPage] = useState(0);
	const [pageCount, setpageCount] = useState(0);

	console.log("Page number ", page)
	console.log("page max", pageCount)
	console.log(storyState)

	
	function forward() {
		if (page < pageCount){
			setPage(page + 1);
		}
	}
	function backward() {
		if (page > 0){setPage(page - 1);}
	}
	function makeNewPage(storyState) {
		let myStory = storyState
		if (pageCount >= 10) return (console.log("You have reached the maximum number of pages"))
		//Check the intial page count before running the function
		console.log("intial pageCount", pageCount)
		//Log the storyState
		// console.log(storyState)

		//populate placeholder variables
		let templateName = "splitTop";
		let positions = 3;
		let quadrants = [
			{
				number: 1,
				type: "image",
				span: false,
				content: "/images/placeholders/cover.jpg",
			},
			{
				number: 2,
				type: "image",
				span: false,
				content: "/images/placeholders/cover.jpg",
			},
			{
				number: 3,
				type: "image",
				span: true,
				content: "/images/placeholders/cover.jpg",
			},
		];

		//Into the first item in the .pages array, push
		myStory.story.pages.push({
			//one higher than the page count
			number: pageCount+1,
			templateName: templateName,
			positions: positions,
			quadrants: [],
		});
		// console.log("myStory.story.pages", myStory.story.pages)

		for (let i = 0; i < positions; i++) {
			console.log(quadrants[i]);
			myStory.story.pages[pageCount+1].quadrants.push({
				number: quadrants[i].number,
				type: quadrants[i].type,
				span: quadrants[i].span,
				content: quadrants[i].content,
			});
		}
		// console.log("Story with new page added: ", story)
		// console.log("page number after adding new", page)
		setpageCount(pageCount+1)
		// console.log("final page count", pageCount)
		// return myStory;
		updatestoryState(myStory)
	}

	return (
		<div>
			<div onClick={() => makeNewPage(storyState)}>Click me to create a new page</div>
			<div onClick={forward}>Click me to navigate forward</div>
			<div onClick={backward}>Click me to navigate backwards</div>
		</div>
	);
};
export default Testing;

// export async function getServerSideProps(){
// 	const apiUrlEndpoint = "http://localhost:3000/api/getposts-lib";
// 	const response = await fetch(apiUrlEndpoint);
// 	const data = await response.json()
// 	console.log("data", data)
// 	return {props: {data}}

// }

// 	{
// 		number: qNumber,
// 		type: type,
// 		span: span,
// 		content: content,
// 	},
// 	{
// 		number: qNumber,
// 		type: type,
// 		span: span,
// 		content: content,
// 	},
// 	{
// 		number: qNumber,
// 		type: type,
// 		span: span,
// 		content: content,
// 	},
// 	{
// 		number: qNumber,
// 		type: type,
// 		span: span,
// 		content: content,
// 	},

// for (let i = 1; i < 11; i++) {
// 	count = i;
// 	story.pages.push({
// 		number: i,
// 		templateName: "{templateName}",
// 		positions: "{positionsCount}",
// 		quadrants: [
// 			{
// 				number: 1,
// 				type: "{type}",
// 				span: "{span}",
// 				content: "{content}",
// 			},
// 			{
// 				number: 1,
// 				type: "{type}",
// 				span: "{span}",
// 				content: "{content}",
// 			},
// 			{
// 				number: 1,
// 				type: "{type}",
// 				span: "{span}",
// 				content: "{content}",
// 			},
// 			{
// 				number: 1,
// 				type: "{type}",
// 				span: "{span}",
// 				content: "{content}",
// 			},
// 		],
// 	});
// }
// story.pages.push({
// 	number: count + 1,
// 	templateName: "cover",
// 	positions: 1,
// 	quadrants: [
// 		{
// 			number: 1,
// 			type: "image",
// 			span: null,
// 			content: backCover,
// 		},
// 	],
// });

// let dataResponse;
// dataResponse = data.posts;
// console.log(dataResponse)
// const [dataResponse, setdataResponse] = useState([]);
// useEffect(() => {
// 	async function getPosts() {
// 		const apiUrlEndpoint = "http://localhost:3000/api/getposts-lib";
// 		// postData sends info to the API. Using to specify ID of item to request
// 		const response = await fetch(apiUrlEndpoint);
// 		const res = await response.json();
// 		// console.log(res);
// 		setdataResponse(res.posts);
// 	}
// 	getPosts();
// }, []);
// // console.log(dataResponse[0]);
// if (dataResponse.length == 0) return <div>loading</div>
// console.log(dataResponse.posts[0])
