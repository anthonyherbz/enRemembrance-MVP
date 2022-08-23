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
				<Col sm="5" md="5" lg='5'>
					<Row>
						<Col justifyContent="center" sm="2" md="2" lg='2'><Image
							src="/images/profile.svg"
							width="30"
							height="30"
							alt="profile icon"
							// layout="responsive"
						/></Col>
						<Col sm="8" md="8" lg='8'><Heading level="3">AUTHOR NAME</Heading></Col>
					</Row>
				</Col>
				<Col alignItems="flex-end"  sm="5" md="5" lg='5'><Text textAlign="right">Member for 2 years</Text></Col>
			</Row>
			<Row>
				<Text>Author Description. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos explicabo illum voluptas.</Text>
			</Row>
		</div>
	);
};
export default Author;
