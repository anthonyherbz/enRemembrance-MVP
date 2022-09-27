import ImageContainer from "./ImageContainer";
import styles from "./storycreatorpage.module.scss";
import Heading from "./Heading";
import { useState } from "react";
import Image from "next/image";

const StoryCreatorPage = ({
	page,
	makeNewPage,
	workingStory,
	forward,
	title,
}) => {
	const [templateType, settemplateType] = useState("uninitialized");
	const updateTemplate = (value) => {
		settemplateType(value);
		currPage.templateName = value;
	};
	const contentArray = [1, 2, 3, 4];
	// console.log("template type", templateType);
	let story = workingStory.story;
	let currPage = story.pages[page];
	console.log(currPage);
	// console.log("page reported by scp", page);
	// console.log("Story", story);
	console.log(`template at ${page}`, story.pages[page].templateName);

	let template;
	switch (currPage.templateName) {
		case "uninitialized":
			template = (
				<div className={styles.uninitalized}>Pick a template</div>
			);
			break;
		case "cover":
			template = (
				<div className={styles.cover}>
					<Image layout="responsive" width="200px" height="300px" src={currPage.quadrants[0].content} />
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
				currPage.quadrants.push({
					number: i + 1,
					type: undefined,
					span: span,
					content: contentArray[i],
				});
			}
			template = (
				<div className={styles.splitTop}>
					{currPage.quadrants.map((quadrant) => {
						if (quadrant.span == true) {
							return (
								<div key={quadrant.number}>
									Start typing or choose an image
								</div>
							);
						}
						return <div key={quadrant.number}>Choose an image</div>;
					})}
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
				currPage.quadrants.push({
					number: i + 1,
					type: undefined,
					span: span,
					content: contentArray[i],
				});
			}
			template = (
				<div className={styles.splitBottom}>
					{currPage.quadrants.map((quadrant) => {
						if (quadrant.span == true) {
							return (
								<div key={quadrant.number}>
									Start typing or choose an image
								</div>
							);
						}
						return <div key={quadrant.number}>Choose an image</div>;
					})}
				</div>
			);
			break;
		case "splitFour":
			currPage.quadrants = [];
			for (let i = 0; i < 4; i++) {
				let span = false;
				currPage.quadrants.push({
					number: i + 1,
					type: undefined,
					span: span,
					content: contentArray[i],
				});
			}
			template = (
				<div className={styles.splitFour}>
					{currPage.quadrants.map((quadrant) => {
						return (
							<div key={quadrant.number}>
								Start typing or choose an image
							</div>
						);
					})}
				</div>
			);
			break;
	}

	return (
		<div className={styles.storyCreatorPage}>
			{page !== 0 ? (
				<form>
					<button
						type='submit'
						disabled
						style={{ display: "none" }}
						aria-hidden='true'
					></button>
					<label htmlFor='template'>
						Choose a template for this page
					</label>
					<select
						name='template'
						onChange={(e) => updateTemplate(e.target.value)}
					>
						<option value='uninitialized'></option>
						<option value='splitTop'>Split Top</option>
						<option value='splitBottom'>Split Bottom</option>
						<option value='splitFour'>Fourths</option>
					</select>
				</form>
			) : null}
			{page == 0 && !!title ? (
				<div className={styles.title}>
					<Heading level='2'>{title}</Heading>
				</div>
			) : null}
			{template}
		</div>
	);
};
export default StoryCreatorPage;
