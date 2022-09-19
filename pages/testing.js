import React, { useState, useEffect } from "react";
import PostFeedv2 from "../components/post/PostFeedv2";

const Testing = () => {
	const [dataResponse, setdataResponse] = useState([]);
	// const [userResponse, setUserResponse] = useState([]);
	// useEffect(() => {
		
	// }, []);
	async function addPost() {
		const apiUrlEndpoint = "http://localhost:3000/api/newpost-lib";
		const response = await fetch(apiUrlEndpoint);
		const res = await response.json();
		console.log(res);
		// setdataResponse(res);
	}
	//empty [] needed for useEffect otherwise it will infinitely rerender, making infinite calls to server
	return (
		<div>
			<div onClick={()=>{addPost()}}>Click to add a new post</div>
			{/* <div>{setdataResponse.id}</div> */}
			<PostFeedv2/>
		</div>
	);
};
export default Testing;
