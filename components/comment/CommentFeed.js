import Comment from "./Comment"
import styles from "./commentfeed.module.scss"


const CommentFeed = ({ comments, stacked }) => {
	
	let undef = false
	if (comments == undefined || comments.length == 0) {
		undef = true
	}
	return (
		<>
			{undef == false ? (
				<div className={styles.commentfeed}>
					{comments.map((comment, index) => {
						return <Comment key={index} comment={comment} stacked={stacked} />
					})}
				</div>
			) : (
				<div>There are no comments to show.</div>
			)}
		</>
	)
}
export default CommentFeed
