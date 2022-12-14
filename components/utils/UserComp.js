//Component that appears on the author page proper showing membership duration, author pen name (full name on mouseover), and a short bio
//Reqs: Text, Col, Row
//Props: author-id
import styles from "./author.module.scss";
import Heading from "./Heading";
import Text from "./Text";
import Image from "next/image";

const UserComp = ({ user }) => {
	return (
		<section className={styles.author}>
			<div className={styles.r1}>
				<div className={styles.r1c1}>
					<div className={styles.r1c1c1}>
						{/* <Image
							src={`/images/profile/${user.id}`}
							width='30'
							height='30'
							alt='profile icon'
							// layout="responsive"
						/> */}
					</div>
					<div>
						<Heading level='2'>{user.handle}</Heading>
					</div>
				</div>
				<div className={styles.r1c2}>
					<Text textAlign='right'>{user.join_date}</Text>
				</div>
			</div>
			<div className={styles.r2}>
				<Text>{user.bio}</Text>
			</div>
		</section>
	);
};
export default UserComp;