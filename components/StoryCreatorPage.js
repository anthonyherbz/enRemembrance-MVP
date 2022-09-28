import ImageContainer from "./ImageContainer";
import styles from "./storycreatorpage.module.scss";
import Heading from "./Heading";
import { useState } from "react";
import Image from "next/image";
import classNames from "classnames/bind";
import StoryContentSelector from './StoryContentSelector'
let cx = classNames.bind(styles);

const StoryCreatorPage = ({
	page,
	makeNewPage,
	workingStory,
	forward,
	title,
	updatestoryState,
	pagePreInc,
	setPagePreInc
}) => {
	let modifierClasses = cx({
		coverStyle : page==0,
		gridStyle : page!=0
	})
	const [templateType, settemplateType] = useState("uninitialized");
	const [pageState, setpageState] = useState(page)

	const contentArray = [1, 2, 3, 4];
	// console.log("template type", templateType);
	let currPage = workingStory.story.pages[page];
	// console.log(currPage);
	const updateTemplateJson = (value) => {
		settemplateType(value)
		currPage.templateName=value
		
	};
	console.log(currPage.quadrants)
	//Resets template state if the current page is not the one stored in pageState, and updates pageState to match the current page. This is to avoid the problem where you can only force a rerender on state change, so when adding a new page with MakeNewPage() the templateType state would not reset (and MakeNewPage is working with the story object at the parent component, so this component's states are inaccessible), meaning there was no rerender if two of the same page types were changed in a row. I'm sure this isn't the best solution for the problem, but I've spent like an hour and a half trying different thigns so this is what I'm going to use.
	if (pageState != page){
		settemplateType("uninitialized")
		setpageState(page)
	}

	// console.log("currpage template name", currPage.templateName)
	// console.log("page reported by scp", page);
	// console.log("Story", workingStory);
	// console.log(`template at ${page}`, workingStory.story.pages[page].templateName);

	if (currPage.number != 0){
		// currPage.templateName="uninitialized"
	}

	function pushQuadrants(currPage, i, span){
		currPage.quadrants.push({
			number: i + 1,
			type: undefined,
			span: span,
			content: contentArray[i],
		});
	}


	let template;
	switch (currPage.templateName) {
		case "uninitialized":
			template = (
				<div className={styles.uninitalized}>No template chosen</div>
			);
			break;
		case "cover":
			template = (
				<div className={styles.cover}>
					<Image layout="fill" objectFit="contain" src={currPage.quadrants[0].content} />
				</div>
			);
			break;
		case "splitTop":
			currPage.quadrants = [];
			for (let i = 0; i < 3; i++) {
				let span = false;
				if (i > 1) {
					span = true;
				}
				pushQuadrants(currPage, i, span)

			}
			template = (
				<div className={styles.retainer}>
					<div className={styles.splitTop}>
						{currPage.quadrants.map((quadrant) => {
							if (quadrant.span == true) {
								return (
									<div key={quadrant.number}>
										<StoryContentSelector type="both" quadrant={quadrant}/>
									</div>
								);
							}
							return <div key={quadrant.number}><StoryContentSelector type="image" quadrant={quadrant}/></div>;
						})}
					</div>
				</div>
			);
			break;
		case "splitBottom":
			currPage.quadrants = [];
			for (let i = 0; i < 3; i++) {
				let span = false;
				if (i < 1) {
					span = true;
				}
				pushQuadrants(currPage, i, span)
			}
			template = (
				<div className={styles.retainer}>
					<div className={styles.splitBottom}>
						{currPage.quadrants.map((quadrant) => {
							if (quadrant.span == true) {
								return (
									<div key={quadrant.number}>
										{/* Start typing or choose an image */}
									</div>
								);
							}
							return <div key={quadrant.number}>{/* Choose an image */}</div>;
						})}
					</div>
				</div>
			);
			break;
		case "splitFour":
			currPage.quadrants = [];
			for (let i = 0; i < 4; i++) {
				let span = false;
				pushQuadrants(currPage, i, span)

			}
			// console.log("workingStory", workingStory)
			template = (
				<div className={styles.retainer}>
					<div className={styles.splitFour}>
						{currPage.quadrants.map((quadrant) => {
							return (
								<div key={quadrant.number}>
									{/* Start typing or choose an image */}
								</div>
							);
						})}
					</div>
				</div>
			);
			break;
	}

	return (
		<div className={styles.storyCreatorPage}>
			{page !== 0 ? (
				<>
					{currPage.templateName !="uninitialized" ? <button onClick={() => updateTemplateJson("uninitialized")}>
						Undo Choice
					</button> : null} 
					{currPage.templateName == "uninitialized" ? 
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
					: null}
				</>
				// onChange={(e) => updateTemplate(e.target.value)
			) : null}
			{page == 0 && !!title ? (
				<div className={styles.title}>
					<Heading level='2'>{title}</Heading>
				</div>
			) : null}
			{template}
			<div style={{position: "fixed"}}>{page}</div>
		</div>
	);
};
export default StoryCreatorPage;
