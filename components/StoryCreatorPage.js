import ImageContainer from "./ImageContainer"
import styles from "./storycreatorpage.module.scss"
import Heading from "./Heading"
import { useState } from "react"
import Image from "next/image"
import classNames from "classnames/bind"
import StoryContentSelector from "./StoryContentSelector"
import update from "immutability-helper"

let cx = classNames.bind(styles)

const StoryCreatorPage = ({ page, storyState, title, storyId, updatestoryState }) => {
	const [templateType, settemplateType] = useState("uninitialized")
	const [pageState, setpageState] = useState(page)
	const [storedImages, setStoredImages] = useState([])
	const parentPath = `images/stories/id${storyId}/page${page}`

	//Resets template state if the current page is not the one stored in pageState, and updates pageState to match the current page. This is to avoid the problem where you can only force a rerender on state change, so when adding a new page with MakeNewPage() the templateType state would not reset (and MakeNewPage is working with the story object at the parent component, so this component's states are inaccessible), meaning there was no rerender if two of the same page types were changed in a row. I'm sure this isn't the best solution for the problem, but I've spent like an hour and a half trying different thigns so this is what I'm going to use.

	if (pageState != page) {
		settemplateType("uninitialized")
		setpageState(page)
	}
	let currPage = storyState.story.pages[page]

	const updateTemplateJson = (type) => {
		settemplateType(type)
		let quadVals = pushQuadrants(type) // Receive the updated values for all quadrants
		let upd = update(storyState, {
			story: {
				pages: { [page]: { templateName: { $set: type }, quadrants: { $set: quadVals } } },
			},
		})
		updatestoryState(upd)
	}

	function pushQuadrants(type) {
		let updVals //Initialize update values

		function handleBuild(span) {
			//Inserts the span at the correct location in the object to be inserted into the updated story state
			let qmax = span.length
			let newVals = []
			for (const i = 0; i < qmax; i++) {
				newVals.push({ number: i + 1, content: "", type: undefined, span: span[i] })
			}
			return newVals
		}
		let span
		switch (type) {
			case "splitTop":
				span = [false, false, true]
				updVals = handleBuild(span)
				break
			case "splitBottom":
				span = [true, false, false]
				updVals = handleBuild(span)
				break
			case "splitFour":
				span = [false, false, false, false]
				updVals = handleBuild(span)
				break
		}
		return updVals
	}
	function handleTemplate(type) {
		let styleVal
		//Set the style appropriate to the passed type
		if (type == "splitTop") styleVal = styles.splitTop
		if (type == "splitBottom") styleVal = styles.splitBottom
		if (type == "splitFour") styleVal = styles.splitFour
		let result = (
			<div className={styles.retainer}>
				<div className={styleVal}>
					{currPage.quadrants.map((quadrant, index) => {
						//Check if the stype (span/quadrant type) is text and image or just image
						let stype = "both"
						if (!quadrant.span) stype = "image"
						return (
							<div key={index}>
								<StoryContentSelector
									type={stype}
									quadrant={quadrant}
									setStoredImages={setStoredImages}
									storyState={storyState}
									updatestoryState={updatestoryState}
									page={page}
									storedImages={storedImages}
									// Set the path equal to the parent path value and the -q ${quadrant number}
									path={`${parentPath}-q${quadrant.number}`}
								/>
							</div>
						)
					})}
				</div>
			</div>
		)
		return result
	}

	let template // Initialize an empty template
	// Read the name of the template from the story state's current page
	switch (storyState.story.pages[page].templateName) {
		case "uninitialized":
			template = <div className={styles.uninitalized}>No template chosen</div>
			break
		case "cover":
			// Take the parent path, which points to a named page file, and use the higher level directory (id${StoryId}) as coverPath
			const coverPath = parentPath.split("/page")[0]
			template = (
				<div className={styles.cover}>
						<StoryContentSelector
							currPage={currPage.quadrants[0].content}
							path={coverPath}
							type='cover'
							storyState={storyState}
							updatestoryState={updatestoryState}
							page={page}
						/>
				</div>
			)
			break
		case "splitTop":
			template = handleTemplate("splitTop")
			break
		case "splitBottom":
			template = handleTemplate("splitBottom")
			break
		case "splitFour":
			template = handleTemplate("splitFour")
			break
	}

	return (
		<div className={styles.storyCreatorPage}>
			{/* If the page isn't page 0 (AKA NOT COVER), return the full selector interface */}
			{page !== 0 ? (
				<div className={styles.buttons}>
					{currPage.templateName != "uninitialized" ? (
						<button onClick={() => updateTemplateJson("uninitialized")}>
							Undo Choice
						</button>
					) : null}
					{currPage.templateName == "uninitialized" ? (
						<>
							<button onClick={() => updateTemplateJson("splitTop")}>
								Select split top
							</button>
							<button onClick={() => updateTemplateJson("splitBottom")}>
								Select split bottom
							</button>
							<button onClick={() => updateTemplateJson("splitFour")}>
								Select four equal spots
							</button>
						</>
					) : null}
				</div>
			) : null}
			{/* If it's page 0 and there is a value in title, show the title on the screen */}
			{page == 0 && !!title ? (
				<div className={styles.title}>
					<Heading level='2'>{title}</Heading>
				</div>
			) : null}
			{template} {/* Show the template variable */}
			{/* Show the page count indicator */}
			<div style={{ position: "absolute", bottom: "0", right: "0" /* left: "0" */ }}>
				{page}
			</div>
		</div>
	)
}
export default StoryCreatorPage
