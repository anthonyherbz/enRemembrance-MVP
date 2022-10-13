import styles from "./postfeed.module.scss"
import PostFromFeed from "./PostFromFeed"

//Generates a feed of posts via data from getPosts()
const PostFeedv2 = ({ posts, comments, postExpressions, storyExpressions}) => {
	// console.log("post exp", postExpressions)
	const mappedPosts = posts.map((post, index) => {
		let pid = post.post_id
		let fComm = comments.filter(function (comment) {
			return comment.post_comments_id == pid
		})
		let fPE = postExpressions.filter(function (PE) {
			return PE.post_id == pid
		})
		let fSE = storyExpressions.filter(function (SE) {
			return SE.post_id == pid
		})
		// console.log("fPE", fPE)
		// console.log("fSE", fSE)
		return <PostFromFeed post={post} key={index} counter={index} comments={fComm} postExpressions={fPE} storyExpressions={fSE}/>
	})
	return <div className={styles.postFeed}>{mappedPosts}</div>
}
export default PostFeedv2