import Author from "../components/Author";
import {
	getAuthors,
	getPosts,
	getBooks,
	getComments,
	getPost,
} from "./api/api";
import styles from "../page_sass/postpage.module.scss";
import CommentFeed from "../components/CommentFeed";
import Heading from "../components/Heading";
import Image from "next/image";
import Link from "next/link";
import ButtonText from "../components/button/ButtonText";
import Logo from "../components/Logo";

const comments = getComments();

const PostPage = () => {
	let post = getPost(0);
	console.log(post);

	return (
		<>
			<div className={styles.postPage}>
				<div className={styles.leftcol}>
					<Logo size="1-5x"/>
					<div className={styles.bookElement}>
						<Link href='/book'>
							<a>
								<Image
									width='50'
									height='50'
									src={`/images/${post.bookCover}`}
								/>
							</a>
						</Link>
						<div>Expressions go here</div>
						<div>{post.bookTitle}</div>
					</div>
					<ButtonText>Back</ButtonText>
				</div>
				<div className={styles.rightcol}>
					<div className={styles.postElement}>
						<div className={styles.peR1}>
							<Heading level='1'>{post.postTitle}</Heading>
							<div className={styles.per1c}>
								<Image
									width='50'
									height='50'
									src={`/images/${post.authorProfile}`}
								/>
								{post.author}
							</div>
						</div>
						<div className={styles.peR2}>{post.postContent}</div>
					</div>
					<CommentFeed comments={comments} />
				</div>
				{/* <Post post={post} /> */}
				{/* <ButtonText color='green' size='large' label='Back' /> */}
			</div>
		</>
	);
};
export default PostPage;
