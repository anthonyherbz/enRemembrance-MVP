import Post from "./Post"
import styles from "./postfeed.module.scss"
import { getPosts } from "../../pages/api/api"
import { useState, useEffect } from "react"
import Postv3 from "./Postv3"
import PostFromFeed from "./PostFromFeed"

//Generates a feed of posts via data from getPosts()
const PostFeedv2 = ({posts}) => {
	const [dataResponse, setdataResponse] = useState(posts)
	// useEffect(() => {
	// 	async function getPosts() {
	// 		const apiUrlEndpoint = "/api/getposts-lib"
	// 		const response = await fetch(apiUrlEndpoint)
	// 		const res = await response.json()
	// 		// console.log(res);
	// 		setdataResponse(res.posts)
	// 	}
	// 	getPosts()
	// }, [])
	// console.log(dataResponse)
	// if (dataResponse.length == 0) return <div>loading</div>
	console.log("posts in dataResponse", dataResponse)
	return (
		<div className={styles.postFeed}>
			{console.log(dataResponse[0])}
			<PostFromFeed post={dataResponse[0]} />
		</div>
	)
}
export default PostFeedv2
