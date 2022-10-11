//Vertical, scrolling list of comments. Not interactable outside of scroll
//Takes up available page width
//Reqs: Comment, ScrollList
//Props: space-between
import Comment from './Comment'
import styles from './commentfeed.module.scss'

const CommentFeed = ({comments}) => {
	if (comments == undefined){
		return <div>There are no comments to show.</div>
	}
	return (
		<div className={styles.commentfeed}>
			{comments.map((comment, index) =>{
				return (
					<Comment key={index} comment={comment}/>
				)
			})}
		</div>
	)
}
export default CommentFeed;