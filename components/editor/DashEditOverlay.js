import styles from "./dasheditoverlay.module.scss"
import Heading from "../Heading"
import Link from "next/link"
import Router from 'next/router'

const DashEditOverlay = ({ stories }) => {
	function edit(id){
		Router.push({pathname: "/editor", query: {storyId: id}})
	}
	return (
		<>
			<div className={styles.overlay}>
				<div className={styles.overlayBG} onClick={() => setshowEdit(false)}></div>
				<div className={styles.overlayCenter}>
					<div className={styles.overlayTitle}>
						<Heading level='2'>Select a story to open the editor</Heading>
					</div>
					<div className={styles.overlayScroll}>
						<ul>
							{stories.map((story, index) => {
								return (
									<li key={index} onClick={() => edit(story.id)}>
										{story.title}
									</li>
								)
							})}
						</ul>
					</div>
				</div>
			</div>
		</>
	)
}
export default DashEditOverlay
