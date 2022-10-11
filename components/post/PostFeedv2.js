import Post from "./Post"
import styles from "./postfeed.module.scss"
import { getPosts } from "../../pages/api/api"
import { useState, useEffect } from "react"
import Postv3 from "./Postv3"
import PostFromFeed from "./PostFromFeed"

//Generates a feed of posts via data from getPosts()
const PostFeedv2 = ({ posts, comments }) => {
	const mappedPosts = posts.map((post, index) => {
		let pid = post.post_id
		let fComm = comments.filter(function (comment) {
			return comment.post_comments_id == pid
		})
		// console.log(fComm)
		return <PostFromFeed post={post} key={index} counter={index} comments={fComm} />
	})
	return <div className={styles.postFeed}>{mappedPosts}</div>
}
export default PostFeedv2

// console.log(comments)
// let nc;

// nc = comments.filter(function(comment){
// 	return comment.post_comments_id == 1
// })
// 	console.log(nc)

// return (
// 	<div className={styles.postFeed}>
// 		{dataResponse.map((post, index) =>{
// 			{console.log(post)}
// 			return (
// 				<PostFromFeed post={post} key={index} counter={index}/>
// 			)
// 		})}
// 	</div>
// )
