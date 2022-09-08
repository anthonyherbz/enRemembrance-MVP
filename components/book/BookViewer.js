//View a completed book. Includes page turning buttons and page count beneath main view, clickable regions on the outer 25% vertical of pages to navigate between pages
//Reqs: Button, BookText, BookPhoto
//Props:

import styles from "./bookviewer.module.scss";
import { useState } from "react";
import Image from "next/image";
import ImageContainer from "../ImageContainer";
import BookPage from "./BookPage";
import Icon from "../icons/Icon";
const BookViewer = ({ book }) => {
	const [position, setPosition] = useState(0);
	// console.log(book.pages.length)
	function addPos() {
		if (position < (book.pages.length)-2) {
			setPosition(position + 2);
		}
	}
	function subPos() {
		if (position >= 1) {
			setPosition(position - 2);
		}
	}

	console.log(book);
	return (
		<div className={styles.bookParent}>
			<div className={styles.bookViewer}>
				<BookPage page={book.pages[position]} />
				<BookPage page={book.pages[position+1]} />
			</div>
			<div className={styles.bookController}>
				<div onClick={subPos}><Icon name='arrow' rotate='180' /></div>
				<div className={styles.indicator}> position {position}</div>
				<div onClick={addPos}><Icon name='arrow' /></div>
			</div>
		</div>
	);
};
export default BookViewer;
