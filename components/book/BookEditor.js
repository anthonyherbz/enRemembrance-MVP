//Editor shown on the create/edit story page.
//Needs a text input for the cover page, to know what kind of page it is (front cover, back cover, regular page), a button to choose an image, a button to pick a category for the book, display the author text on the cover, the cover image, a page counter, buttons to turn the page, show template
//Reqs: Button, image, TextInput, Text, Header, BookTemplate
//Props: type(front, back, page), template,

import styles from "./bookeditor.module.scss";
import ButtonText from "../button/ButtonText";
import Text from "../Text";
import Icon from "../icons/Icon";
import { useState } from "react";
import React from "react";
import Image from "next/image";
import EditorBookPages from "./EditorBookPages";

//pull in book from main id page
const BookEditor = ({ book }) => {

	let pages = book.pages;
	console.log(book);
	console.log(book.pages.length)
	//store the page position
	const [position, setPosition] = useState(0);
	//increment page position
	function addPos() {
		if (position < pages.length-1) {
			setPosition(position + 1);
		}
	}
	//decrement page position
	function subPos() {
		if (position >= 1) {
			setPosition(position - 1);
		}
	}

	return (
		<div className={styles.bookEditorParent}>
			<div className={styles.bookEditor}>
				{/* arrow pointing left, needs cursor:pointer, click runs subPos */}
				<div className={styles.arrow} onClick={subPos}>
					<Icon name='arrow' rotate='180' />
				</div>
				{/* primary component of the page. should take a book and position states */}
				<EditorBookPages
					book={book}
					position={position}
					setPosition={setPosition}
				/>
				{/* arrow pointing right, needs cursor:pointer, click runs addPos */}
				<div className={styles.arrow} onClick={addPos}>
					<Icon name='arrow' />
				</div>
			</div>
			{/* bottom navigation to change between pages on click */}
			<div className={styles.bookBottom}>
				<div className={styles.filmstrip}>
					{/* take the pages from book */}
					{pages.map((page, index) => {
						return (
							<div
								key={index}
								// 
								onClick={() => {
									setPosition(index);
								}}
							>
								<Image
									layout='fill'
									objectFit='cover'
									src={`/images/${page.template.positions[1].content}`}
								/>
							</div>
						);
					})}
				</div>
				{position > 0 ? <>Page {position}</> : <>Cover</>}
			</div>
		</div>
	);
};
export default BookEditor;
