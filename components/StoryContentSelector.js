import Image from "next/image";
import { useState } from "react";

const StoryContentSelector = ({type, quadrant}) => {
	const [image, setImage] = useState()
	const [text, setText] = useState()
	const [isSelected, setIsSelected] = useState(false);
console.log(quadrant.type)
console.log(quadrant.content)
	const changeHandler = (event) => {
		let file = event.target.files[0];
		// setSelectedFile(file); //not working, not used
		setIsSelected(true);
		setImage(URL.createObjectURL(file));
		quadrant.type="image"
		quadrant.content=image
	};
	if (type == "image"){
		return (
		<>
			<input type="file" onChange={changeHandler}></input>
			{isSelected ? <Image layout="fill" objectFit="cover" src={image}></Image> : null}
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