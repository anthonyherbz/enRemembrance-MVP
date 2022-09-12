import Router, { useRouter } from "next/router";
import { getBook } from "../api/api";
import Col from "../../components/Col";
import Row from "../../components/Row";
import ButtonText from "../../components/button/ButtonText";
import BookViewer from "../../components/book/BookViewer";
import Logo from "../../components/Logo";
import Heading from "../../components/Heading";
import styles from '../../page_sass/bookpreview.module.scss'

const Book = () => {
	// return ( 
		// <div className={styles.bookPreview}>
		// 	<Col ratio='1' alignItems='center' justifyContent='space-between'>
		// 		<Logo size='1-5x' />
		// 		<div className={styles.bookContent}>
		// 			<Heading level='1'>{book.title}</Heading>
		// 			<Row>{book.date}</Row>
		// 			<Row>{book.author}</Row>
		// 			<Row>{book.description}</Row>
		// 		</div>
		// 		<ButtonText path='/' color='blue'>
		// 			Back
		// 		</ButtonText>
		// 	</Col>
		// 	<div className={styles.colright}>
		// 		<BookViewer book={book} />
		// 	</div>
		// </div>
	// );
};

export default Book;
