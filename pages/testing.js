import React, { useState } from "react";
import Author from "../components/Author";
import { getAuthors, getPosts } from "./api/api";
import PostFeed from "../components/feed/PostFeed";
import ButtonText from "../components/button/ButtonText";

const Testing = () => {
	const [selectedFile, setSelectedFile] = useState();
	const [isSelected, setIsSelected] = useState(false);
	const [fileUrl, setFileUrl] = useState()
	const changeHandler = (event) => {
		
		setSelectedFile(event.target.files[0]);
		setIsSelected(true);
		setFileUrl(URL.createObjectURL(event.target.files[0]))
		
		console.log(event.target.files[0]);console.log(event);
		console.log(fileUrl)
		
	};
	const handleUpload = () => {};

	return (
		<div>
			










			<div style={{display: "none"}}>
				<input
					type='file'
					name='file'
					accept='image/png, image/jpg'
					onChange={changeHandler}
				/>
				{isSelected ? (
					<div>
						<p>Filename: {selectedFile.name}</p>
						<p>Filetype: {selectedFile.type}</p>
						<p>Byte Size: {selectedFile.size}</p>
						<img src={fileUrl} alt="image supposed to go here" width="200" height="200"></img>
					</div>
				
				) : (
					<p>Select File</p>
				)}
				<div>
					<button onClick={handleUpload}>Submission</button>
				</div>
			</div>
		</div>
	);
};
export default Testing;
