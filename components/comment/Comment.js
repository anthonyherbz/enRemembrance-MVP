//Contains the comment reply text on a post. Presently unclear if you can comment on both a post and book, or just a post, or if there is even a distinction between the two
//Reqs: Author, Text, Row
//Props:
import Link from "next/link";
import Image from "next/image";
import styles from "./comment.module.scss";
import classNames from "classnames/bind";
let cx = classNames.bind(styles);

const Comment = ({ comment, stacked }) => {
	// console.log(comment)
	const varStyles = cx({
		comment: true,
		stacked: stacked == true
	})
	return (
		<div className={varStyles}>
			<div>
				<Link href={`/users/${comment.commentor_id}`}>
						<div className={styles.commentAuthor}>
							<div className={styles.containedImg}>
								<Image
									width='25'
									height='25'
									src={`/images/users/id${comment.commentor_id}.jpg`}
									alt="comment user profile image"
								/>
							</div>
							{comment.handle}: {comment.comment_text}
						</div>
					 
				</Link>
			</div>
		</div>
	);
};
export default Comment;
