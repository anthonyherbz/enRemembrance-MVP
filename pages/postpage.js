import Author from "../components/Author";
import {
	getAuthors,
	getPosts,
	getBooks,
	getComments,
	getPost,
	getBook,
} from "./api/api";
import ImageContainer from "../components/ImageContainer";
import styles from "../page_sass/postpage.module.scss";
import CommentFeed from "../components/comment/CommentFeed";
import Heading from "../components/Heading";
import Image from "next/image";
import Link from "next/link";
import ButtonText from "../components/button/ButtonText";
import Logo from "../components/Logo";
import ExpressionPreview from "../components/expressions/ExpressionPreview";
import Container from "../components/Container";
import Row from "../components/Row";
import Col from "../components/Col";
// import ImageContainer from "../components/ImageContainer";

const comments = getComments();

const PostPage = () => {
	let post = getPost(0);
	let book = getBook(0);
	console.log(post);

	return (
		<>
			<div className={styles.postPage}>
				<Logo size='1-5x' />
				<div className={styles.mobileButton}>
								<ButtonText>Back</ButtonText>
							</div>
				<div className={styles.body}>
					<div className={styles.leftcol}>
						<div className={styles.bookElement}>
							<div className={styles.bookCover}>
								<Link href='/book'>
									<a>
										<ImageContainer
											src={`/images/${post.bookCover}`}
										/>
									</a>
								</Link>
							</div>
							<div>
								<ExpressionPreview />
							</div>
							<div>{book.date}</div>
						</div>
						<ButtonText>Back</ButtonText>
					</div>
					<div className={styles.rightcol}>
						<div className={styles.postElement}>
							
							<div className={styles.peR1}>
								<Heading level='1'>{post.postTitle}</Heading>
								<ExpressionPreview />
								<div className={styles.per1c}>
									<Image
										width='50'
										height='50'
										src={`/images/${post.authorProfile}`}
									/>
									{post.author}
								</div>
							</div>
							<div className={styles.peR2}>
								{post.postContent}
							</div>
							<div className={styles.mobileRow}>
								<div className={styles.mobileCover}>
									<Link href='/book'>
										<a>
											<ImageContainer
												src={`/images/${post.bookCover}`}
											/>
										</a>
									</Link>
								</div>
								<div className={styles.mobileInfo}>
									<ul>
										<li>Published: {book.date}</li>
										<li>View Book</li>
										<li>Buy Book</li>
									</ul>
								</div>
							</div>
						</div>
						<CommentFeed comments={comments} />
					</div>
				</div>
				{/* <Post post={post} /> */}
				{/* <ButtonText color='green' size='large' label='Back' /> */}
			</div>
		</>
	);
};
export default PostPage;
