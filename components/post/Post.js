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
import { useState } from "react";
import EnterComment from "./EnterComment";

let cx = classNames.bind(styles);

const Post = ({
	author,
	authorProfile,
	book,
	bookCover,
	bookSlug,
	comment,
	commentAuthor,
	postContent,
	hideComment,
	hideAuthor,
	postSlug,
}) => {
	const [showComment, setShowComment] = useState(0);
	function toggleComment() {
		setShowComment(!showComment);
	}

	//Set dynamic styles based on props
	let postClasses = cx({
		hideComment: hideComment,
		hideAuthor: hideAuthor,
	});
	return (
		<div className={styles.post}>
			{/* <Row> */}
			{/* left-most column containing the book's cover and it's expressions */}
			<div className={styles.c1}>
				{/* col */}
				<Link href={`/books/${bookSlug}`}>
					<a>
						<img src={`/images/${bookCover}`} alt='placeholder' />
					</a>
				</Link>
				<ExpressionPreview />
			</div>
			{/* center column containing book title, the post text, and a single comment */}
			<div className={styles.c2}>
				{/* col */}
				<div className={styles.r1}>
					<div>
						<Link href={`/books/${bookSlug}`}>
							<a>
								<Heading level='3'>{book}</Heading>
							</a>
						</Link>
					</div>
					{/* should link to a specific author's profile */}
					<div className={postClasses}>
						<Link href={`/authors/${author}`}>
							<a>
								<img src={`/images/${authorProfile}`} />
							</a>
						</Link>
					</div>
				</div> {/*row1 end*/}
				<div className={styles.r2}>
					<Link href={`/posts/${postSlug}`}>
						<a>{postContent}</a>
					</Link>
				</div> {/*row 2 end*/}
				<div className={styles.r3}>
					<div className={styles.commentbody}>
						<Link href={`/posts/${postSlug}`}>
							<a>
								<Heading level='4'>Comments</Heading>
								{commentAuthor}: {comment}
							</a>
						</Link>
					</div> 
					{/* comment icon that opens and closes the comment box */}
					<div
						style={{ cursor: "pointer", zIndex:"1" }}
						className={postClasses}
						onClick={toggleComment}
					>
						<img src='/images/comment.jpg' alt='placeholder' />
					</div>
				</div> {/*row 3 end*/}
			</div>
			{/* </Row> */}
			{showComment ? (
				<EnterComment
					toggleComment={toggleComment}
					showComment={showComment}
					setShowComment={setShowComment}
				/>
			) : null}
		</div>
	);
};
export default Post;
