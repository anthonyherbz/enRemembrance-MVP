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
	console.log("story page state", storyState.story)
	console.log("page", page)
	//what is this
	// let modifierClasses = cx({
	// 	coverStyle: page == 0,
	// 	gridStyle: page != 0,
	// });
	const [templateType, settemplateType] = useState("uninitialized")
	const [pageState, setpageState] = useState(page)
	const [storedImages, setStoredImages] = useState([])
	const parentPath = `images/stories/id${storyId}/page${page}`
	if (pageState != page) {
		settemplateType("uninitialized")
		setpageState(page)
	}
	let currPage = storyState.story.pages[page]

	console.log("storystate page", storyState.story.pages[page])
	console.log("currPage", currPage)

	const updateTemplateJson = (type) => {
		settemplateType(type)
		// console.log("upd type", type)
		let quadVals = pushQuadrants(type)
		// console.log(quadVals)
		let upd = update(storyState, {
			// story:{pages:{[page]:{templateName:{$set: type}}}},
			story: {
				pages: { [page]: { templateName: { $set: type }, quadrants: { $set: quadVals } } },
			},
		})
		updatestoryState(upd)
		// console.log("upd1", upd)
	}
	//Resets template state if the current page is not the one stored in pageState, and updates pageState to match the current page. This is to avoid the problem where you can only force a rerender on state change, so when adding a new page with MakeNewPage() the templateType state would not reset (and MakeNewPage is working with the story object at the parent component, so this component's states are inaccessible), meaning there was no rerender if two of the same page types were changed in a row. I'm sure this isn't the best solution for the problem, but I've spent like an hour and a half trying different thigns so this is what I'm going to use.
	function pushQuadrants(type) {
		console.log("ran pushquad")
		// console.log("type", type)
		let updVals
		function handleBuild(span) {
			console.log("ran handlebuild")
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
				console.log("chose splittop")
				span = [false, false, true]
				updVals = handleBuild(span)
				break
			case "splitBottom":
				console.log("chose splitbottom")
				span = [true, false, false]
				updVals = handleBuild(span)
				break
			case "splitFour":
				console.log("chose splitfour")
				span = [false, false, false, false]
				updVals = handleBuild(span)
				break
		}
		return updVals
	}
	function handleTemplate(type) {
		let styleVal
		if (type == "splitTop") styleVal = styles.splitTop
		if (type == "splitBottom") styleVal = styles.splitBottom
		if (type == "splitFour") styleVal = styles.splitFour
		let result = (
			<div className={styles.retainer}>
				<div className={styleVal}>
					{currPage.quadrants.map((quadrant, index) => {
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

	let template
	switch (storyState.story.pages[page].templateName) {
		case "uninitialized":
			template = <div className={styles.uninitalized}>No template chosen</div>
			break
		case "cover":
			template = (
				<div className={styles.cover}>
					<Image layout='fill' objectFit='contain' src={currPage.quadrants[0].content} />
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
			) : // onChange={(e) => updateTemplate(e.target.value)
			null}
			{page == 0 && !!title ? (
				<div className={styles.title}>
					<Heading level='2'>{title}</Heading>
				</div>
			) : null}
			{template}
			<div style={{ position: "absolute", bottom: "0", right: "0" }}>{page}</div>
		</div>
	)
}
export default StoryCreatorPage
