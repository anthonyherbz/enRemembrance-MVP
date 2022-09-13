import styles from "./editorbookpages.module.scss";
import ButtonText from "../button/ButtonText";
import Image from "next/image";
import React, { useState } from "react";
import BookPage from "./BookPage";

const EditorBookPages = ({ book, position, setPosition }) => {
	// let title = book.title;
	// console.log(title)
	const [selectedFile, setSelectedFile] = useState();
	const [isSelected, setIsSelected] = useState();
	const [fileUrl, setFileUrl] = useState();

	const changeHandler = (event) => {
		let file = event.target.files[0];
		// setSelectedFile(file); //not working, not used
		setIsSelected(true);
		setFileUrl(URL.createObjectURL(file));
	};

	//deprecated function that would search to match an image with an index
	// function matchId(searchId) {
	// 	let result = pageList.filter((item) => {
	// 		return item.id === searchId;
	// 	});
	// 	return result[0].image;
	// }

	//returns the cover interactive screen if position is 0
	if (position == 0) {
		return (
			<div className={styles.bookElement}>
				{/* shows the selected image if isSelected is true */}
				{isSelected ? (
					<div
						style={{
							position: "absolute",
							top: "0",
							bottom: "0",
							left: "0",
							right: "0",
							zIndex: "-1",
						}}
					>
						<div
							style={{
								position: "relative",
								width: "100%",
								height: "100%",
							}}
						>
							<Image
								src={fileUrl}
								layout='fill'
								objectFit='cover'
							/>
						</div>
					</div>
				) : null}
				{isSelected ? (
					book.title
				) : (
					<div className={styles.textbox}>
						<label htmlFor='booktitle' >Book Title</label>
						<input placeholder={book.title} name='booktitle' type='text'></input>
					</div>
				)}
				<div className={styles.buttons}>
					<ButtonText
						size='large'
						color='yellow'
						label='Choose Cover'
					/>
					<label htmlFor='cover'>Upload Image</label>
					<input
						type='file'
						name='cover'
						accept='image/png, image/jpg'
						onChange={changeHandler}
					/>
					<ButtonText size='medium' label='pick category' />
				</div>
				<div className={styles.authorText}>{book.author}</div>
			</div>
		);
	} else {
		return (
			<div className={styles.bookElement}>
				<BookPage hidecount pos={position} page={book.pages[position]}/>
			</div>
		);
	}
};
export default EditorBookPages;
