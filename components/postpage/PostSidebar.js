import styles from "./postsidebar.module.scss"
import Link from "next/link"
import ExpressionPreview from "../expressions/ExpressionPreview"
import ImageContainer from "../ImageContainer"

const PostSidebar = ({ post, expressions, templates }) => {
	return (
		<>
			<div className={styles.bookElement}>
				<div className={styles.bookCover}>
					<Link href={`/stories/${post.story_id}`}>
						 
							<ImageContainer
								src={`/images/stories/id${post.story_id}/cover.jpg`}
								alt="The story's cover image"
							/>
						 
					</Link>
				</div>
				<div style={{position: "relative"}}>
					<ExpressionPreview align="left" expressions={expressions} template={templates} parent_id={post.story_id} type='story'/>
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
								 View Story 
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
