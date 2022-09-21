import { useEffect, useState } from "react";
import styles from "./post.module.scss";
import classNames from "classnames/bind";
import Link from "next/link";
import Heading from "../Heading";
import ExpressionPreview from "../expressions/ExpressionPreview";
import EnterComment from "./EnterComment";
import ImageContainer from "../ImageContainer";
// import { useRouter } from "next/router";

//3rd iteration of the post component which will use multiQuery to get data from multiple statements with a single connection

const Postv3 = ({ post, count, hide }) => {
	const [dataResponse, setdataResponse] = useState([]);
	const [loaded, setLoaded] = useState(false);
	const [story, setStory] = useState();
	const [comment, setComment] = useState();

	useEffect(() => {
		if (post == undefined) return;
		// let story = dataResponse.stories[0]
		// let comment = dataResponse.comments[0]
		async function getData() {
			const apiUrlEndpoint = "http://localhost:3000/api/getpostinfo-lib";
			const postData = {
				method: "Post",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					story_id: post.story_id,
					post_id: post.id,
				}),
			};
			const response = await fetch(apiUrlEndpoint, postData);
			const res = await response.json();
			console.log("res", res);
			setdataResponse((dataResponse = res));
			console.log("dataResponse", dataResponse);
			setStory((story = dataResponse.stories[0]));
			setComment((comment = dataResponse.comments[0]));
			setLoaded(true);
			console.log(story, comment);
		}
		getData();
		// console.log("Story response ", storyResponse)
	}, []);

	const [showComment, setShowComment] = useState(0);

	function toggleComment() {
		setShowComment(!showComment);
	}
	let cx = classNames.bind(styles);
	let commentAuthor = "";
	let postClasses = cx({});

	// if (storyResponse == undefined) {
	// 	//basic error handling
	// 	return <div>No story returned for post_id {post.id}</div>;
	// }
	// if ((dataResponse == undefined) || (dataResponse.length == 0)){
	// 	return <div>loading</div>
	// }

	return (
		// <></>
		<div key={count} className={styles.post}>
			{/* <Row> */}
			{/* left-most column containing the book's cover and it's expressions */}
			<div className={styles.c1}>
				{/* col */}
				{loaded ? (
					<Link href={`/stories/${story.id}`}>
						<a>
							<div style={{ width: "50px", height: "75px" }}>
								<ImageContainer
									src={`/images/covers/placeholder${story.id}.jpg`}
									alt='placeholder'
								/>
							</div>
						</a>
					</Link>
				) : null}
				<ExpressionPreview />
			</div>
			{/* center column containing book title, the post text, and a single comment */}
			<div className={styles.c2}>
				{/* col */}
				<div className={styles.r1}>
					<div>
						{loaded ? (
							<Link href={`/stories/${story.id}`}>
								<a>
									<Heading level='3'>{story.title}</Heading>
								</a>
							</Link>
						) : null}
					</div>
					{/* should link to a specific author's profile */}
					<div className={postClasses}>
						{loaded ? (
							<Link href={`/users/${story.author_id}`}>
								<a>
									<img
										src={`/images/users/${story.author_id}.jpg`}
									/>
								</a>
							</Link>
						) : null}
					</div>
				</div>{" "}
				{/*row1 end*/}
				<div className={styles.r2}>
					{loaded ? (
						<Link href={`/posts/${post.id}`}>
							<a>{post.post_text}</a>
						</Link>
					) : null}
				</div>{" "}
				{/*row 2 end*/}
				<div className={styles.r3}>
					<div className={styles.commentbody}>
						{loaded ? (
							<Link href={`/posts/${post.id}`}>
								<a>
									<Heading level='4'>Comments</Heading>
									{comment.commentor_id}:{" "}
									{comment.comment_text}
								</a>
							</Link>
						) : null}
					</div>
					{/* comment icon that opens and closes the comment box */}
					<div
						style={{ cursor: "pointer", zIndex: "1" }}
						className={postClasses}
						onClick={toggleComment}
					>
						<div style={{ width: "50px", height: "50px" }}>
							{loaded ? (
								<ImageContainer
									src='/images/comment.jpg'
									alt='placeholder'
								/>
							) : null}
						</div>
					</div>
				</div>
				{/*row 3 end*/}
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
export default Postv3;


//Potential post query
// SELECT posts.post_text, posts.post_date, 
// users.id AS user_id, users.handle, 
// post_comments.comment_text, post_comments.commentor_id, post_comments.comment_date,
// stories.title, stories.author_id, stories.id AS story_id,
// post_expressions.*, story_expressions.*

// FROM posts
// INNER JOIN post_comments ON posts.id=post_comments.post_id
// INNER JOIN users ON post_comments.commentor_id=users.id
// INNER JOIN stories ON posts.story_id=stories.id
// INNER JOIN post_expressions ON posts.id=post_expressions.post_id
// INNER JOIN story_expressions ON stories.id=story_expressions.story_id