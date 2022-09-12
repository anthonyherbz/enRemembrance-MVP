//Primary display of posts available to site members
//Pipe| = row; Three Col: BookCover|Expressions>title|contents|Comment>Author|comment icon
//Needs to display drop shadow on hover, maybe grow and increase z level if needed
//Click Cover or title takes you to book viewing page, click post body or comments takes you to post page, click comment button gives a comment input dialogue
import styles from "./post.module.scss";
import classNames from "classnames/bind";
import Link from "next/link";
import Heading from "../Heading";
import Expressions from "../expressions/ExpressionPreview";
import ExpressionPreview from "../expressions/ExpressionPreview";

let cx = classNames.bind(styles);

const Post = ({ author, authorProfile, book, bookCover, bookSlug, comment, commentAuthor, postContent, hideComment, hideAuthor }) => {
	//Below are some placeholder arrays of what the component might expect to work with. Missing in props above because React can't take a prop declared in the same file.
	//Placeholder author array


	let postClasses = cx({
		hideComment: hideComment,
		hideAuthor: hideAuthor,
	});
	return (
		<div className={styles.post}>
			{/* <Row> */}
			<div className={styles.c1}>
				{/* col */}
				<Link href={`/books/${bookSlug}`}>
					<a>
						<img
							src={`/images/${bookCover}`}
							alt='placeholder'
						/>
					</a>
				</Link>
				<ExpressionPreview/>
			</div>
			<div className={styles.c2}>
				{/* col */}
				<div className={styles.r1}>
					<div>
						<Link href={`/books/${bookSlug}`}>
							<a><Heading level="3">{book}</Heading></a>
						</Link>
					</div>
					<div className={postClasses}>
						<Link href={`/authors/${author}`}>
							<a>
								<img src={`/images/${authorProfile}`} />
							</a>
						</Link>
					</div>
				</div>
				<div className={styles.r2}>{postContent}</div>
				<div className={styles.r3}>
					<div>
						<Heading level='4'>Comments</Heading>
						{commentAuthor}: {comment}
					</div>
					<div className={postClasses}>
						<img src='/images/comment.jpg' alt='placeholder' />
					</div>
				</div>
			</div>
			{/* </Row> */}
		</div>
	);
};
export default Post;
