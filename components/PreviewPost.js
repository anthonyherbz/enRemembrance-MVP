//Minified, information-sparse variant of the post component that only displays cover, title, and a small description. Used in the preview feed to advertise site contents to new visitors. 2 Col of BookCover and Text
//Requires Col, Row, BookCover, Text
import styles from "./previewpost.module.scss";
import Link from "next/link";
import Heading from "./Heading";

const PreviewPost = ({ book }) => {
	//pull props out of title.book, etc.
	const {title, slug, cover, content} = book;
	return (
		<div className={styles.previewPost}>
			<div className={styles.c1}>
				<Link href={slug}>
					<a>
						<img src={`/images/${cover}`} alt='placeholder' />
					</a>
				</Link>
			</div>
			<div className={styles.c2}>
				<div className={styles.r1}>
						<Link href={slug}>
							<a>
								<Heading level='3'>{title}</Heading>
							</a>
						</Link>
				</div>
				<div className={styles.r2}>{content}</div>
			</div>
		</div>
	);
};
export default PreviewPost;
