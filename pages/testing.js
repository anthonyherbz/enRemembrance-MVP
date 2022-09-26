import React, { useState, useEffect } from "react";
import PostFeedv2 from "../components/post/PostFeedv2";
import Postv3 from "../components/post/Postv3";
import StoryCreator from "../components/StoryCreator";

const Testing = ({ data }) => {
	return (
		<StoryCreator/>
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
