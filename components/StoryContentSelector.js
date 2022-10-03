import Image from "next/image";
import { useState } from "react";
import { GiConsoleController } from "react-icons/gi";
import ImageUpload from './imageupload'

const StoryContentSelector = ({type, quadrant, setStoredImages, storedImages, path}) => {
	const [image, setImage] = useState()
	const [text, setText] = useState()
	const [isSelected, setIsSelected] = useState(false);
console.log("quadrant.type",quadrant.type)
console.log("quadrant.content",quadrant.content)
console.log("image", image)
console.log("quadnum", quadrant.number)
console.log("quadimg", storedImages[quadrant.number])
let finalPath = path


	const changeHandler = (event) => {
		let file = event.target.files[0];
		// setSelectedFile(file); //not working, not used
		setIsSelected(true);
		const myImage = URL.createObjectURL(file)
		// console.log("myImage", myImage)
		setImage(image = myImage);
		quadrant.type="image"
		quadrant.content=myImage
		console.log("myimg", myImage)

		storedImages.push({
			image: image
		})
		setStoredImages(storedImages)
	};
	if (type == "image"){
		return (
		<>
			<ImageUpload fileNamePath={finalPath}/>
			{/* <input type="file" onChange={changeHandler}></input>
			{isSelected ? <Image layout="fill" objectFit="cover" src={storedImages[(quadrant.number)-1].image}></Image> : null} */}
		</>
	)}
	if (type == "both"){
		return (
			<>
				<input type="file" onChange={changeHandler}></input>
			{isSelected ? <Image layout="fill" objectFit="cover" src={image}></Image> : null}
				<input type="text"></input>
			</>
		)
	}
}
export default StoryContentSelector;