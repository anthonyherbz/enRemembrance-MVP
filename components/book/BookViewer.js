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
	console.log("pages ", book.pages.length);
	//Function to increment the position
	function addPos() {
		//Prevents error of position of second page outrunning pages length
		if (position < book.pages.length - 3) {
			//If pos is less than 1 (aka 0) increment by 1
			//Allows showing cover at position 0 and page 1 and 2 at postion 1
			if (position < 1) {
				setPosition(position + 1);
			}
			//Otherwise, add two to pos
			else {
				setPosition(position + 2);
			}
		}
	}
	//Function to decrement the position
	function subPos() {
		if (position >= 2) {
			setPosition(position - 2);
		} else if (position >= 1) {
			setPosition(position - 1);
		}
	}

	function addPosMobile(){
		if (position < book.pages.length - 2){
			setPosition(position + 1)
		}
	}
	function subPosMobile(){
		if (position >= 1){
			setPosition(position - 1)
		}
	}

	// console.log(book);
	return (
		<div className={styles.bookParent}>
			<div className={styles.bookViewer}>
				{position > 0 ? (
					<>
						<BookPage pos={position} page={book.pages[position]} />
						<BookPage
							pos={position}
							page={book.pages[position + 1]}
						/>
					</>
				) : (
					<>
						<BookPage
							cover={book.coverName}
							pos={position}
							page={book.pages[position]}
						/>
					</>
				)}
			</div>
			<div className={styles.bookController}>
				<div onClick={subPos}>
					<Icon name='arrow' rotate='180' />
				</div>
				<div onClick={addPos}>
					<Icon name='arrow' />
				</div>
			</div>
			<div className={styles.mobile}>
				<div className={styles.bookViewerMobile}>
					<BookPage
						cover={book.coverName}
						pos={position}
						page={book.pages[position]}
					/>
				</div>
				<div className={styles.bookController}>
					<div onClick={subPosMobile}>
						<Icon name='arrow' rotate='180' />
					</div>
					<div onClick={addPosMobile}>
						<Icon name='arrow' />
					</div>
				</div>
			</div>
		</div>
	);
};
export default BookViewer;
