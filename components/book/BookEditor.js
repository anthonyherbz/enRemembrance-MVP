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

const BookEditor = () => {
	let pages = [
		{
			id: 1,
			image: "placeholder1.jpg",
		},
		{
			id: 2,
			image: "placeholder2.jpg",
		},
		{
			id: 3,
			image: "placeholder3.jpg",
		},
		{
			id: 4,
			image: "placeholder4.jpg",
		},
		{
			id: 5,
			image: "placeholder5.jpg",
		},
		{
			id: 6,
			image: "placeholder6.jpg",
		},
		{
			id: 7,
			image: "placeholder7.jpg",
		},
		{
			id: 8,
			image: "placeholder8.jpg",
		},
	];
	const [position, setPosition] = useState(0);
	function addPos() {
		if (position < pages.length){
			setPosition(position + 1);
		}
	}
	function subPos() {
		if (position >= 1) {	
			setPosition(position - 1);
		}
	}
	

	return (
		<div className={styles.bookEditorParent}>
			<div className={styles.bookEditor}>
				<div className={styles.arrow} onClick={subPos}>
					<Icon name='arrow' rotate='180' />
				</div>
				<EditorBookPages
					pageList={pages}
					position={position}
					setPosition={setPosition}
				/>
				<div className={styles.arrow} onClick={addPos}>
					<Icon name='arrow' />
				</div>
			</div>
			<div className={styles.bookBottom}>
				<div className={styles.filmstrip}>
					{pages.map((page, index) => {
						return (
							<div key={index}
								onClick={() => {
									setPosition(index + 1);
								}}
							>
								<Image
									layout='fill'
									objectFit="cover"
									// width='75'
									// height='75'
									src={`/images/${page.image}`}
								/>
							</div>
						);
					})}
				</div>
				{position >0 ? <>Page {position}</> : <>Cover</> }
			</div>
		</div>
	);
};
export default BookEditor;
