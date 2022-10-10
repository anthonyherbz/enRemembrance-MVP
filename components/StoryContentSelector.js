import Image from "next/image"
import { useState } from "react"
import { GiConsoleController } from "react-icons/gi"
import ImageUpload from "./imageupload"
import update from "immutability-helper"

const StoryContentSelector = ({
	type,
	quadrant,
	setStoredImages,
	storedImages,
	storyState,
	updatestoryState,
	page,
	path,
}) => {
	// const [image, setImage] = useState();
	const [text, setText] = useState()
	// const [isSelected, setIsSelected] = useState(false);
	const [spanChoice, setspanChoice] = useState()
	const [parentImg, setParentImg] = useState()
	const [imageType, setimageType] = useState()
	console.log("content type", type)
	console.log("content quadrant.content", quadrant.content)
	console.log("content parentImg", parentImg)
	console.log("content quadimg", storedImages[quadrant.number])
	console.log("content text", text)
	console.log("context ParentImg value", parentImg)

	// let upd = update(storyState, {
	// 	story: {
	// 		pages: { [page]: { templateName: { $set: type }
	// 	},
	// })
	console.log("quadrants", storyState.story.pages[page].quadrants)
	let finalPath = path
	let fileFormat
	console.log("file format", fileFormat)
	// if (storyState.story.pages[page].quadrants[quadrant.number-1].content.split([1] == jpg)){
	// 	fileFormat = "jpg"
	// } else {
	// 	fileFormat = "png"
	// }

	if (
		storyState.story.pages[page].quadrants[quadrant.number - 1].content.split(".")[1] == "jpg"
	) {
		// console.log("whoopee")
		fileFormat = "jpg"
	}
	if (
		storyState.story.pages[page].quadrants[quadrant.number - 1].content.split(".")[1] == "png"
	) {
		// console.log("whoopee other")
		fileFormat = "png"
	}

	if (parentImg != undefined) {
		let upd = update(storyState, {
			// story:{
			// 	pages: {[page]: {quadrants: {[quadrant.number-1] : {type: {$set: "image"}}}}}
			// }
			story: {
				pages: {
					[page]: {
						quadrants: {
							[quadrant.number - 1]: {
								type: { $set: "image" },
								content: { $set: `${finalPath}.${imageType}` },
							},
						},
					},
				},
			},
		})
		// console.log("yeah", upd.story.pages[page].quadrants[quadrant.number-1].content.split('.')[1])

		updatestoryState(upd)
		// console.log("upd interrior", upd)
		// quadrant.type = "image"
		// quadrant.content = `${finalPath}.${imageType}`
	}

	function updateContent(value, param) {
		let upd
		if (param == "content") {
			upd = update(storyState, {
				story: {
					pages: {
						[page]: {
							quadrants: {
								[quadrant.number - 1]: {
									content: { $set: value },
								},
							},
						},
					},
				},
			})
			updatestoryState(upd)
		}
		if (param == "type") {
			upd = update(storyState, {
				story: {
					pages: {
						[page]: {
							quadrants: {
								[quadrant.number - 1]: {
									type: { $set: value },
								},
							},
						},
					},
				},
			})
			updatestoryState(upd)
		}
	}

	console.log("updated story state", storyState)
	const handleChange = (event) => {
		let value = event.target.value
		setText(value)
		// quadrant.type = "text"
		// quadrant.content = value
		let upd = update(storyState, {
			// story:{
			// 	pages: {[page]: {quadrants: {[quadrant.number-1] : {type: {$set: "image"}}}}}
			// }
			story: {
				pages: {
					[page]: {
						quadrants: {
							[quadrant.number - 1]: {
								type: { $set: "text" },
								content: { $set: value },
							},
						},
					},
				},
			},
		})
		updatestoryState(upd)
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
				<ImageUpload
					fileNamePath={finalPath}
					setParentImg={setParentImg}
					parentImg={parentImg}
					imageType={imageType}
					setimageType={setimageType}
				/>
				{storyState.story.pages[page].quadrants[quadrant.number - 1].content != "" ? (
					<Image layout='fill' objectFit='cover' src={`/${finalPath}.${fileFormat}`} />
				) : null}
			</>
		)
	}

	if (type == "both") {
		return (
			<>
				{storyState.story.pages[page].quadrants[quadrant.number - 1].type == undefined ? (
					<div>
						<button onClick={() => updateContent("image", "type")}>Use an image</button>
						<button onClick={() => updateContent("text", "type")}>Use text</button>
					</div>
				) : (
					<div>
						<button
							style={{ zIndex: "50" }}
							onClick={() => updateContent(undefined, "type")}>
							Undo Choice
						</button>
						{storyState.story.pages[page].quadrants[quadrant.number - 1].type ==
						"text" ? (
							<div>
								<input type='text' onBlur={handleChange}></input>
								<div>{storyState.story.pages[page].quadrants[quadrant.number - 1].content}</div>
							</div>
						) : (
							<div>
								<ImageUpload
									fileNamePath={finalPath}
									setParentImg={setParentImg}
									parentImg={parentImg}
									imageType={imageType}
									setimageType={setimageType}
								/>
								{storyState.story.pages[page].quadrants[quadrant.number - 1]
									.content != "" ? (
									<Image
										layout='fill'
										objectFit='cover'
										src={`/${finalPath}.${fileFormat}`}
									/>
								) : null}
							</div>
						)}
					</div>
				)}
			</>
		)

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
}
export default StoryContentSelector
