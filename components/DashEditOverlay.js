import styles from "./dasheditoverlay.module.scss"
import Heading from "../components/Heading"
import Link from "next/link"

const DashEditOverlay = ({ stories }) => {
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
									<li key={index}>
										<Link href={`/editor`}>
											<a>{story.title}</a>
										</Link>
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
