//Must be scrollable single column of flexible width and infinite(?) rows
//Requires Col,
import Feed from "./Feed";
import Row from "../Row";
import Post from "../post/Post";
import styles from './postfeed.module.scss'

const PostFeed = ({ posts }) => {
	return (
		<div className={styles.postFeed}>
			{posts.map((post, index) => {
				return (
					<Post
						postId={post.postId}
						key={index}
						title={post.PostTitle}
						author={post.author}
						authorProfile={post.authorProfile}
						comment={post.comment}
						commentAuthor={post.commentAuthor}
						postContent={post.postContent}
						book={post.bookTitle}
						bookCover={post.bookCover}
						bookSlug={post.bookSlug}
					/>
				);
			})}
		</div>
	);
};
export default PostFeed;
