import ImageContainer from "../utils/ImageContainer"
import Link from "next/link"
import styles from "./storiesfeed.module.scss"
import Image from "next/image"

const StoriesFeed = ({ stories }) => {
	if (stories.length == 0) {
		return <div>This user doesn&apos;t have any stories visible to you</div>
	}
	// console.log(stories)
	return (
		<div className={styles.storyfeedContainer}>
			<div className={styles.storyfeed}>
				{stories.length == 0 ? (
					<div>This user doesn&apos;t have any stories visible to you</div>
				) : (
					stories.map((story) => {
						return (
							<div className={styles.item} key={story.story_id}>
								<Link href={`/stories/${story.story_id}`}>
									<Image
										src={`/images/stories/id${story.story_id}/cover.jpg`}
										alt='story cover'
										width='55'
										height='80'
									/>
								</Link>
								<Link href={`/stories/${story.story_id}`}>
									<span className={styles.title}>{story.story_title}</span>
									<span className={styles.date}>Created on {story.create_date.split(" ", [1])}</span>
								</Link>
							</div>
						)
					})
				)}
			</div>
		</div>
	)
}
export default StoriesFeed
