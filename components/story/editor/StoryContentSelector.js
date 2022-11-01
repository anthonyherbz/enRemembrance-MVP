import Image from "next/image"
import { useState } from "react"
import { GiConsoleController } from "react-icons/gi"
import ImageUpload from "../../imageupload"
import update from "immutability-helper"

const StoryContentSelector = ({
	type, // Sets whether the componenent needs to render the image selector or both the image and text selector
	quadrant, // Contains the value of currPage.quadrant
	setStoredImages, // unusued
	storedImages, // unusued
	storyState, // Contains the current story state, to be updated by the immutability-helper
	updatestoryState, // Function used to update the story state, passed from grandparent
	page, // The current page number
	path, // The path to save the image to
	currPage, // Unused
}) => {
	const [text, setText] = useState()
	const [spanChoice, setspanChoice] = useState()
	const [parentImg, setParentImg] = useState()
	const [imageType, setimageType] = useState()

	let finalPath = path
	let fileFormat

	if (type != "cover") {
		// Check if the type is not cover
		fileFormat =
			storyState.story.pages[page].quadrants[quadrant.number - 1].content.split(".")[1]
		
		if (parentImg != undefined) {
			// If the parent image state has been defined, set the quadrant's type to image and update the content with the final path and image type. (parentImg is ONLY defined in the case where an image has been uploaded)
			let upd = update(storyState, {
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
			updatestoryState(upd)
		}
	}

	function updateContent(value, param) {
		// Update the content of the quadrant.
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

	const handleChange = (event) => {
		// Handle when text is used in {stype} == "both"
		let value = event.target.value
		setText(value)

		let upd = update(storyState, {
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

	if (type == "image") {
		// Return the image uploader component and the uploaded image stored in the story state
		return (
			<>
				<ImageUpload
					fileNamePath={finalPath}
					setParentImg={setParentImg}
					parentImg={parentImg}
					imageType={imageType}
					setimageType={setimageType}
				/>
				{/* If the .content isn't an empty string, show the image */}
				{storyState.story.pages[page].quadrants[quadrant.number - 1].content != "" ? (
					<Image layout='fill' width='25' height='25' object-fit='cover' src={`/${finalPath}.${fileFormat}`} alt={`An image on page ${page} of this story.`} />
				) : null}
			</>
		)
	}

	if (type == "both") {
		// Return the choice options when nothing is selected, or the image/text and undo button when selected
		return (
			<>
				{/* If the type is not yet defined, show the selection buttons */}
				{storyState.story.pages[page].quadrants[quadrant.number - 1].type == undefined ? (
					<div>
						{/* Update the content type to match image or text */}
						<button onClick={() => updateContent("image", "type")}>Use an image</button>
						<button onClick={() => updateContent("text", "type")}>Use text</button>
					</div>
				) : (
					/* Render this when the type has been defined */
					<div>
						<button
							style={{ zIndex: "50" }}
							onClick={() => updateContent(undefined, "type")}>
							Undo Choice
						</button>
						{storyState.story.pages[page].quadrants[quadrant.number - 1].type ==
						"text" ? (
							/* Show the text entry box */
							<div>
								<input type='text' onBlur={handleChange}></input>
								<div>
									{
										storyState.story.pages[page].quadrants[quadrant.number - 1]
											.content
									}
								</div>
							</div>
						) : (
							/* If the type isn't text, show the image upload component and the selected image if one has been uploaded */
							<div>
								<ImageUpload
									fileNamePath={finalPath}
									setParentImg={setParentImg}
									parentImg={parentImg}
									imageType={imageType}
									setimageType={setimageType}
								/>
								{storyState.story.pages[page].quadrants[quadrant.number - 1]
									.content != "" ? ( // If content is not an empty string, show the image
									<Image
										layout='fill'
										height='25'
										width='25'
										 object-fit='cover'
										src={`/${finalPath}.${fileFormat}`}
									/>
								) : null}
							</div>
						)}
					</div>
				)}
			</>
		)
	}
	if (type == "cover") {
		// If the type is cover, return almost identical component to type image. Needs to show the image selector at all times as well as the selected image at all times.
		
		fileFormat =
		storyState.story.pages[page].quadrants[0].content.split(".")[1]
		if (parentImg != undefined) {
			
			let upd = update(storyState, {
				story: {
					pages: {
						[0]: {
							quadrants: {
								[0]: {
									content: { $set: `/${finalPath}/cover.${imageType}` },
								},
							},
						},
					},
				},
			})
			updatestoryState(upd)
		}

		return (
			<>
				<div style={{ position: "relative", zIndex: "100" }}>
					<ImageUpload
						fileNamePath={`${finalPath}/cover`}
						setParentImg={setParentImg}
						parentImg={parentImg}
						imageType={imageType}
						setimageType={setimageType}
					/>
				</div>
				{storyState.story.pages[page].quadrants[0].content ==
				"/images/placeholders/cover.jpg" ? (
					<Image fill="true" object-fit='cover' src={`/images/placeholders/cover.jpg`} alt="The cover image"/>
				) : (
					<Image
						fill="true"
						alt="The cover image"
						object-fit='cover'
						src={`/${finalPath}/cover.${fileFormat}`}
					/>
				)}
			</>
		)
	}
}
export default StoryContentSelector
