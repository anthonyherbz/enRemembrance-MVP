import styles from "./postsidebar.module.scss"
import Link from "next/link"
import ExpressionPreview from "../expressions/ExpressionPreview"
import ImageContainer from "../ImageContainer"

const PostSidebar = ({ post, expressions }) => {
	return (
		<>
			<div className={styles.bookElement}>
				<div className={styles.bookCover}>
					<Link href={`/stories/${post.story_id}`}>
						<a>
							<ImageContainer
								src={`/images/stories/id${post.story_id}/cover.jpg`}
								alt="The story's cover image"
							/>
						</a>
					</Link>
				</div>
				<div style={{position: "relative"}}>
					<ExpressionPreview align="left" expressions={expressions} />
				</div>
				<div>
					{/* should technically be about the published 0/1 but */}
					{post.story_publish_date != undefined
						? post.story_publish_date
						: "Not published"}
				</div>
				<div className={styles.info}>
					<ul>
						<li>
							<Link href={`/stories/${post.story_id}`}>
								<a>View Story</a>
							</Link>
						</li>
						<li>Buy Story</li>
					</ul>
				</div>
			</div>
		</>
	)
}
export default PostSidebar
