import styles from "./postfeed.module.scss"
import PostFromFeed from "./PostFromFeed"

const PostFeedv2 = ({ posts, comments, postExpressions, storyExpressions, expressionTemplates}) => {
	// console.log("post exp", postExpressions)
	// console.log(posts)
	if (!posts || posts.length==0) {return <div>There are no posts to show</div>}
	const mappedPosts = posts.map((post, index) => {
		// {console.log(post)}
		let pid = post.post_id
		let sid = post.story_id
		let fComm = comments.filter(function (comment) {
			return comment.post_comments_id == pid
		})
		let fPE = postExpressions.filter(function (PE) {
			return PE.post_id == pid
		})
		let fSE = storyExpressions.filter(function (SE) {
			return SE.story_id == sid
		})
		// console.log("fPE", fPE)
		// console.log("fSE", fSE)
		return <PostFromFeed post={post} key={index} counter={index} comments={fComm} postExpressions={fPE} storyExpressions={fSE} expressionTemplates={expressionTemplates}/>
	})
	return <div className={styles.postFeed}>{mappedPosts}</div>
}
export default PostFeedv2