import React, { useState, useEffect } from "react";
import PostFeedv2 from "../components/post/PostFeedv2";
import Postv3 from "../components/post/Postv3";

const Testing = ({data}) => {
	let dataResponse;
	dataResponse = data.posts;
	console.log(dataResponse)
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
	return (
		<div>
			<Postv3 post={dataResponse[0]}/>
			{/* <div onClick={()=>{addPost()}}>Click to add a new post</div> */}
			{/* <div>{setdataResponse.id}</div> */}
			{/* <PostFeedv2/> */}
		</div>
	);
};
export default Testing;

export async function getServerSideProps(){
	const apiUrlEndpoint = "http://localhost:3000/api/getposts-lib";
	const response = await fetch(apiUrlEndpoint);
	const data = await response.json()
	console.log("data", data)
	return {props: {data}}

}