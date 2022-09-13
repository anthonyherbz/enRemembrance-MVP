
import Post from "./Post";
import styles from './postfeed.module.scss'
import { getPosts } from "../../pages/api/api";

//Generates a feed of posts via data from getPosts()
const PostFeed = () => {
	const posts = getPosts();
	return (
		//May be better to pass in the post object instead
		<div className={styles.postFeed}>
			{posts.map((post, index) => {
				return (
					<Post
						postId={post.postId}
						key={index}
						title={post.postTitle}
						author={post.author}
						authorProfile={post.authorProfile}
						comment={post.comment}
						commentAuthor={post.commentAuthor}
						postContent={post.postContent}
						book={post.bookTitle}
						bookCover={post.bookCover}
						bookSlug={post.bookSlug}
						postSLug="post"
					/>
				);
			})}
		</div>
	);
};
export default PostFeed;
