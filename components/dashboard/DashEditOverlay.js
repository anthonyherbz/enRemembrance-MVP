import styles from "./dasheditoverlay.module.scss"
import Heading from "../utils/Heading"
import Link from "next/link"
import Router from 'next/router'

const DashEditOverlay = ({ stories, setshowEdit }) => {
	function edit(id){
		Router.push({pathname: "/editor", query: {storyId: id}})
	}
	return (
		<>
			<div className={styles.overlay}>
				<div className={styles.overlayBG} onClick={() => setshowEdit(false)}></div>
				<div className={styles.overlayCenter}>
					<button onClick={()=>{setshowEdit(false)}}>Close</button>
					<div className={styles.overlayTitle}>
						<Heading level='2'>Select a story to open the editor</Heading>
					</div>
					
					<div className={styles.overlayScroll}>
						<ul>
							{stories.map((story, index) => {
								return (
									<li key={index} onClick={() => edit(story.id)}>
										<span>{story.title}</span>
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
