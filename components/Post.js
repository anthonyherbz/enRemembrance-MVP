//Primary display of posts available to site members
//Pipe| = row; Three Col: BookCover|Expressions>title|contents|Comment>Author|comment icon
//Needs to display drop shadow on hover, maybe grow and increase z level if needed
//Click Cover or title takes you to book viewing page, click post body or comments takes you to post page, click comment button gives a comment input dialogue
import styles from "./post.module.scss";
import classNames from "classnames/bind";
import Link from "next/link";
import Heading from "../components/Heading";

let cx = classNames.bind(styles);

const Post = ({ size, hideComment, hideAuthor }) => {
	//Below are some placeholder arrays of what the component might expect to work with. Missing in props above because React can't take a prop declared in the same file.
	//Placeholder author array
	const author = [
		{
			slug: "/author_example",
			name: "author1",
			profile: "profile.jpg",
		},
	];
	//Placeholder book array
	const book = [
		{
			title: "book",
			slug: "/book_example",
			cover: "bookcover.jpg",
		},
	];
	//Placeholder comment array
	const comment = [
		{
			content: "brief comment text of top comment",
			author: "commentor name",
		},
	];

	const postContent =
		"Lorem ipsum, dolor sit amet consectetur adipisicing elit. Incidunt facere modi sequi non minus? Provident blanditiis eos sequi excepturi, a libero officia quia, sed culp facilis dolore velit voluptatem voluptate?";

	let postClasses = cx({
		hideComment: hideComment,
		hideAuthor: hideAuthor,
	});
	return (
		<div className={styles.post}>
			{/* <Row> */}
			<div className={styles.c1}>
				{/* col */}
				<Link href={book[0].slug}>
					<a>
						<img
							src={`/images/${book[0].cover}`}
							alt='placeholder'
						/>
					</a>
				</Link>
			</div>
			<div className={styles.c2}>
				{/* col */}
				<div className={styles.r1}>
					<div>
						<Link href={book[0].slug}>
							<a><Heading level="3">{book[0].title}</Heading></a>
						</Link>
					</div>
					<div className={postClasses}>
						<Link href={author[0].slug}>
							<a>
								<img src={`/images/${author[0].profile}`} />
							</a>
						</Link>
					</div>
				</div>
				<div className={styles.r2}>{postContent}</div>
				<div className={styles.r3}>
					<div>
						<Heading level='4'>Comments</Heading>
						{comment[0].author}: {comment[0].content}
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
