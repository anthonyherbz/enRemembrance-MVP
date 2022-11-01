import { useState } from "react";
import styles from "./expandingtext.module.scss";
import classNames from "classnames/bind";
import Heading from "./Heading";
import Text from "./Text";
let cx = classNames.bind(styles);

const ExpandingText = ({
	title = "blank",
	color = "black",
	backgroundColor = "white",
	children,
}) => {
	let expandingTextClasses = cx({
		expandingText: true,
		[`backgroundColor-${backgroundColor}`]: backgroundColor,
	});
	const [expanded, setExpandState] = useState(false);
	function handleClick() {
		//sets expanded state to whatever it is not
		setExpandState(!expanded); //saves like 10 lines of if/else statements
	}
	return (
		<div className={expandingTextClasses}>
			<div className={styles.topBar} onClick={handleClick}>
				<Heading level='3' color={color}>{title}</Heading>
				{/* For reference, when doing an inline style with react and also using a ?, the false cannot return just "" empty */}
				<svg style={{transform: expanded ? "rotate(180deg)" : null }}
					xmlns='http://www.w3.org/2000/svg'
					width='25'
					height='24'
					fill='none'
					viewBox='0 0 42 24'
				>
					<path
						stroke={color}
						strokeLinecap='round'
						strokeLinejoin='round'
						strokeWidth='6'
						d='M39 3.5 21 20.833 3 3.5'
					/>
				</svg>
			</div>
			<div
				className={styles.content}
				//sets display to none when expanded is false, block when expanded is true
				style={{ display: expanded ? "block" : "none" }}
			>
				<Text color={color} textAlign="left">
					{children}
				</Text>
			</div>
		</div> /* expanding text */
	);
};
export default ExpandingText;
