import Heading from '../components/Heading';
import Row from '../components/Row';
import Col from '../components/Col'
import styles from '../page_sass/bookpreview.module.scss'
import Logo from '../components/Logo';
import { getBook } from './api/api';
import BookViewer from '../components/book/BookViewer';
import ButtonText from '../components/button/ButtonText';

//Renders an example using fake data of what a book will look like when viewed
const BookPreview = () => {
	//Will lead to the permalink of a particular book based on its id in final. Currently just gets the book at 0 in the array
	const book = getBook(0);
	return (
		<div className={styles.bookPreview}>
			<Col ratio="1" alignItems='center' justifyContent='space-between'>
				<Logo/>
				<div className={styles.bookContent}>
				<Heading level="1">{book.title}</Heading>
					<Row>{book.date}</Row>
					<Row>{book.description}</Row>
				</div>
				<ButtonText>Back</ButtonText>
			</Col>
			<div className={styles.colright}>
				<BookViewer book={book}/>
			</div>

		</div>
	)
}
export default BookPreview;