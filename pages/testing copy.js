import React, { useState, useEffect } from "react";

const Testing1 = () => {
	const [dataResponse, setdataResponse] = useState([]);
	// const [userResponse, setUserResponse] = useState([]);
	useEffect(() => {
		async function getPostData() {
			const apiUrlEndpoint = "http://localhost:3000/api/getposts-lib";
			const response = await fetch(apiUrlEndpoint);
			const res = await response.json();
			console.log(res);
			setdataResponse(res.posts);
		}
		getPostData();
	}, []);
	//empty [] needed for useEffect otherwise it will infinitely rerender, making infinite calls to server
	return (
		<div>
			<strong>Posts test</strong>
			{dataResponse.map((post) => {
				return (
					<div key={post.id}>{post.post_text}a</div>
				);
			})}
		</div>
	);
};
export default Testing1;
