import Heading from '../components/Heading';
import Row from '../components/Row';
import Col from '../components/Col'
import styles from '../page_sass/bookpreview.module.scss'
import Logo from '../components/Logo';
import { getBook } from './api/api';

import ButtonText from '../components/button/ButtonText';

const BookPreview = () => {
	const book = getBook(0);
	return (
		<div className={styles.bookPreview}>
			<Col>
				<Logo/>
				<div className={styles.bookContent}>
				<Heading level="1">{book.title}</Heading>
					<Row>{book.date}</Row>
					<Row>{book.description}</Row>
				</div>
				<ButtonText>Back</ButtonText>
			</Col>
			<Col>
				{/* <BookViewer id={book.id}/> */}
			</Col>

		</div>
	)
}
export default BookPreview;