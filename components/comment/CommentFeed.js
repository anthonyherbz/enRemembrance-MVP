import Comment from "./Comment"
import styles from "./commentfeed.module.scss"
import classNames from "classnames/bind";
let cx = classNames.bind(styles);

const CommentFeed = ({ comments, stacked, limit }) => {
	let commentStyles = cx({
		commentfeed: true,
		limit: limit
	})
	let undef = false
	if (comments == undefined || comments.length == 0) {
		undef = true
	}
	return (
		<>
			{undef == false ? (
				<div className={commentStyles}>
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
