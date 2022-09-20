import Post from "./Post";
import styles from "./postfeed.module.scss";
import { getPosts } from "../../pages/api/api";
import { useState, useEffect } from "react";
import Postv2 from "./Postv2";

//Generates a feed of posts via data from getPosts()
const PostFeedv2 = () => {
	const [dataResponse, setdataResponse] = useState([]);
	useEffect(() => {
		async function getPosts() {
			const apiUrlEndpoint = "http://localhost:3000/api/getposts-lib";
			// postData sends info to the API. Using to specify ID of item to request
			const response = await fetch(apiUrlEndpoint);
			const res = await response.json();
			console.log(res);
			setdataResponse(res.posts);
		}
		getPosts();
	}, []);
	// console.log(dataResponse[0]);
	if (dataResponse.length == 0) return <div>loading</div>
	return (
		//May be better to pass in the post object instead
		<div className={styles.postFeed}>
			{/* {console.log(dataResponse[0])} */}
			<Postv2 post={dataResponse[0]} />
			{/* {dataResponse.map((post, index) => {
				return (
					<Postv2 
						post={post}
						count={index}
						hideAuthor="false"
						hideComment="false"
					/>
				);
			})} */}
		</div>
	);
};
export default PostFeedv2;
