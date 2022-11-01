//Used anywhere there will be static video
//Current usage: welcome page
//Intended functionality: HTML5-player locally-hosted static video file
//Props: Video file, player control color, play button color, load-fail image, load-fail color
import styles from "./video.module.scss";

const Video = () => {
	return (
		<div className={styles.wrapper}>
			<video className={styles.video} controls>
				<source src='/videos/test.mp4' type='video/mp4'/>
				If you see this, the video is not working or incompatible.
			</video>
		</div>
	);
};
export default Video;
