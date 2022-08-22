//Component that appears on the author page proper showing membership duration, author pen name (full name on mouseover), and a short bio
//Reqs: Text, Col, Row
//Props: author-id
import Row from "./Row";
import Col from "./Col";
import styles from "./author.module.scss";
import Heading from "./Heading";
import Text from "./Text";
import Image from "next/image";

const Author = () => {
	return (
		<div className={styles.author}>
			<Row>
				<Col lg='6'>
					<Row>
						<Col justifyContent="center" lg='6'><Image
							src="/images/profile.svg"
							width="20"
							height="20"
							alt="profile icon"
							// layout="responsive"
						/></Col>
						<Col lg='6'><Heading level="3">AUTHOR NAME</Heading></Col>
					</Row>
				</Col>
				<Col alignItems="flex-end"  lg='6'><Text textAlign="right">Member for 2 years</Text></Col>
			</Row>
			<Row>
				<Text>Author Description. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos explicabo illum voluptas.</Text>
			</Row>
		</div>
	);
};
export default Author;
