import styles from "./bookpage.module.scss";
import ImageContainer from "../ImageContainer";
import Image from "next/image";
import classNames from "classnames/bind";
let cx = classNames.bind(styles);

//Create one page for a book using the page object, but if the position is 0 display the cover instead.
//Currently only produces a single template (split top, wide bottom)
const BookPage = ({ cover, page, pos }) => {
	console.log("book page ", page.number)

	//destructure data from page template
	let {templateName, positions} = page.template;

	//for future multi-template implementation
	// let template = null;
	// if (templateName="1"){template=1}
	// if (templateName="2"){template=2}
	// if (templateName="3"){template=3}

	//Check if position is 0. If it is, return the cover image instead of a specific page
	if (pos == 0){
		return(
			<div className={styles.cover}>
				<ImageContainer src={`/images/${cover}`}/>
			</div>
		)
	} 
	//Check if the position is greater than 0
	if (pos > 0){
	return(
		<div className={styles.quadrants}>
			{/* Return a map of 3-4 quadrants. If there are only three quadrants, let the one with position.span=="true" cover both columns*/}
			{positions.map((position, index) => {
				let quadStyles = cx({
					[`quad-${position.quad}`] : position.quad,
					quadStyles: true,
					span : position.span=="true",
				})
				return(
				<div key={index} className={quadStyles}>
					{/* If the position type is text, display just the text. Otherwise, display the image */}
					{ position.type=="text" ? 
					// This should probably be replaceed by a text component
						position.content
					:
					<ImageContainer src={`/images/${position.content}`}/>
					}
				</div>
				)
			})}
			{/* Display the page number below the page */}
			<div className={styles.pageNum}>{page.number}</div>
		</div>
	)
}};
export default BookPage;