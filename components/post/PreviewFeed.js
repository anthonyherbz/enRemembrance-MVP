//Appears on the welcome page to contain preview posts and display them to visitors
//Needs to be a scrollable list of PreviewPost components. Flexible
//Requires: Col
import Heading from "../Heading";
import styles from "./previewfeed.module.scss";
// import Feed from "./components/Feed";
import PreviewPost from "./PreviewPost";
// import Text from "./Text";

const PreviewFeed = ({ stories }) => {
	console.log(stories)
	// console.log("PreviewFeed books output: ",{ books });
	return (
		<div className={styles.sizing}>
			<div className={styles.background}>
				<Heading level='2' color='white'>
					Stories from our community
				</Heading>
			</div>
			<div className={styles.previewFeed}>
				{stories.map((story, index) => {
					return <PreviewPost story={story} key={index} />;
				})}
			</div>
		</div>
	);
};
export default PreviewFeed;
