//Minified, information-sparse variant of the post component that only displays coverName, title, and a small description. Used in the preview feed to advertise site descriptions to new visitors. 2 Col of BookCover and Text
//Requires Col, Row, BookCover, Text
import styles from "./previewpost.module.scss";
import Link from "next/link";
import Image from "next/image";
import Heading from "../utils/Heading";

const PreviewPost = ({ story }) => {
	//pull props out of title.book, etc.
	// const {title, slug, coverName, description} = story;
	const {title, id} = story
	return (
		<div className={styles.previewPost}>
			<div className={styles.c1}>
				<Link href={`/stories/${id}`}>
						<Image width="25" height="50" src={`/images/stories/id${id}/cover.jpg`} alt='Story cover' />
				</Link>
			</div>
			<div className={styles.c2}>
				<div className={styles.r1}>
						<Link href={`/stories/${id}`}>
								<Heading level='3'>{title}</Heading>
						</Link>
				</div>
			</div>
		</div>
	);
};
export default PreviewPost;
