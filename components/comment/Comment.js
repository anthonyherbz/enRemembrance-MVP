//Contains the comment reply text on a post. Presently unclear if you can comment on both a post and book, or just a post, or if there is even a distinction between the two
//Reqs: Author, Text, Row
import { getPost, getAuthor, getBook } from "../../pages/api/api";
//Props:
import Link from "next/link";
import Image from "next/image";
import styles from "./comment.module.scss";

const Comment = ({ comment }) => {
	let post = getPost(comment.postId);
	let author = getAuthor(comment.authorId);
	return (
		<div className={styles.comment}>
			<div>
				<Link href={`/users/${comment.commentor_id}`}>
					<a>
						<div className={styles.commentAuthor}>
							<div className={styles.containedImg}>
								<Image
									src={`/images/users/${comment.commentor_id}.jpg`}
									layout='fill'
									objectFit='cover'
								/>
							</div>
							{comment.handle}:
						</div>
					</a>
				</Link>
			</div>
			<div>{comment.comment_text}</div>
		</div>
	);
};
export default Comment;
