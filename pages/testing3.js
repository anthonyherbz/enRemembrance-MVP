import Image from "next/image";
import styles from './testing3.module.scss'

const Testing3 = () => {
	return (
		<div className={styles.topLevel}>
			<div className={styles.midLevel}>
				<Image src="/images/placeholders/cover.jpg" layout="intrinsic" objectFit="cover" width="650px" height="850px"></Image>
			</div>
		</div>
	)
}
export default Testing3;