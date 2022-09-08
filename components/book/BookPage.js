import styles from "./bookpage.module.scss";
import ImageContainer from "../ImageContainer";
import Image from "next/image";
import classNames from "classnames/bind";
let cx = classNames.bind(styles);


const BookPage = ({ page }) => {
	let {templateName, positions} = page.template;
	// let template = null;
	// if (templateName="1"){template=1}
	// if (templateName="2"){template=2}
	// if (templateName="3"){template=3}

	return(
		<div className={styles.quadrants}>
			{positions.map((position, index) => {
				let quadStyles = cx({
					[`quad-${position.quad}`] : position.quad,
					quadStyles: true,
					span : position.span=="true",
				})
				return(
				<div key={index} className={quadStyles}>
					{ position.type=="text" ? 
						position.content
					:
					<ImageContainer src={`/images/${position.content}`}/>
					}
				</div>
				)
			})}
		</div>
	)
};
export default BookPage;

{/* <Image layout="responsive" width="500" height="500" objectFit="cover" src={`/images/${position.content}`}/> */}