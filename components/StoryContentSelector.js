import Image from "next/image";
import { useState } from "react";
import { GiConsoleController } from "react-icons/gi";
import ImageUpload from "./imageupload";

const StoryContentSelector = ({
	type,
	quadrant,
	setStoredImages,
	storedImages,
	path,
}) => {
	// const [image, setImage] = useState();
	const [text, setText] = useState();
	// const [isSelected, setIsSelected] = useState(false);
	const [spanChoice, setspanChoice] = useState();
	const [parentImg, setParentImg] = useState();
	const [imageType, setimageType] = useState();
	// console.log("quadrant.type", quadrant.type);
	console.log("quadrant.content", quadrant.content);
	// console.log("image", image);
	// console.log("quadnum", quadrant.number);
	console.log("quadimg", storedImages[quadrant.number]);
	// console.log("text", text);
	console.log("parentImg value", parentImg)
	let finalPath = path;

	const handleChange = (event) => {
		if (spanChoice == "text"){
			let value = event.target.value;
		setText(value);
		quadrant.type = "text"
		quadrant.content = value
		}
	}
	if (parentImg != undefined){
		quadrant.type="image"
		quadrant.content=`${finalPath}.${imageType}`
	}

	// const changeHandler = (event) => {
	// 	let file = event.target.files[0];
	// 	// setSelectedFile(file); //not working, not used
	// 	setIsSelected(true);
	// 	const myImage = URL.createObjectURL(file);
	// 	// console.log("myImage", myImage)
	// 	setImage((image = myImage));
	// 	quadrant.type = "image";
	// 	quadrant.content = myImage;
	// 	console.log("myimg", myImage);

	// 	storedImages.push({
	// 		image: image,
	// 	});
	// 	setStoredImages(storedImages);
	// };
	if (type == "image") {
		return (
			<>
				<ImageUpload fileNamePath={finalPath} setParentImg={setParentImg} parentImg={parentImg}
								imageType={imageType}
								setimageType={setimageType}
								/>
								{parentImg != undefined ? <Image layout='fill' objectFit='cover' src={`/${finalPath}.${imageType}`}/> : null}
				{/* <input type="file" onChange={changeHandler}></input>
			{isSelected ? <Image layout="fill" objectFit="cover" src={storedImages[(quadrant.number)-1].image}></Image> : null} */}
			</>
		);
	}

	if (type == "both") {
		return (
			<>
				{spanChoice == undefined ? (
					<div>
						<button onClick={() => setspanChoice("image")}>
							Use an image
						</button>
						<button onClick={() => setspanChoice("text")}>
							Use text
						</button>
					</div>
				) : (
					<div>
						<button style={{zIndex: "50"}} onClick={() => setspanChoice(undefined)}>
							Undo Choice
						</button>
						{spanChoice == "text" ? (
							<div>
								<input
									type='text'
									onChange={handleChange}
								></input>
							</div>
						) : (
							<div>
								<ImageUpload fileNamePath={finalPath} setParentImg={setParentImg} parentImg={parentImg}
								imageType={imageType}
								setimageType={setimageType}
								/>
								{parentImg != undefined ? <Image layout='fill' objectFit='cover' src={`/${finalPath}.${imageType}`}/> : null}
							</div>
						)}
					</div>
				)}
			</>
		);

		// if (spanChoice != undefined) {
		// 	if (spanChoice == "text") {
		// 		return (
		//
		// 		)
		// 	}
		// 	if (spanChoice == "image") {
		// 		return <ImageUpload fileNamePath={finalPath} />;
		// 	}
		// }
		// return (
		// 	<>
		// 		<input type='file' onChange={changeHandler}></input>
		// 		{isSelected ? (
		// 			<Image layout='fill' objectFit='cover' src={image}></Image>
		// 		) : null}
		// 		<input type='text'></input>
		// 	</>
		// );
	}
};
export default StoryContentSelector;
