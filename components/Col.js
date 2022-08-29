//Puts items into a vertical list (a column)
//Needs to grow or shrink number of columns depending on screen width
//Reqs: Row(?)

import styles from "./col.module.scss";
import classNames from "classnames/bind";

let cx = classNames.bind(styles);

const Col = ({
	children,
	xs,
	sm,
	md,
	lg,
	textAlign = "left",
	marginBottom,
	flexDirection = "column",
	justifyContent = "flex-start",
	alignItems = "flex-start",
	ratio,
	allowScroll,
	order,
}) => {
	let colClasses = cx({
		col: true,
		[`col-sm-${xs}`]: xs,
		[`col-sm-${sm}`]: sm,
		[`col-md-${md}`]: md,
		[`col-lg-${lg}`]: lg,
		[`text-align-${textAlign}`]: textAlign,
		[`margin-bottom-${marginBottom}`]: marginBottom,
		[`flex-direction-${flexDirection}`]: flexDirection,
		[`justify-content-${justifyContent}`]: justifyContent,
		[`align-items-${alignItems}`]: alignItems,
		[`ratio-${ratio}`]: ratio,
		allowScroll : allowScroll,
		[`order-${order}`] : order,
	});
	return <div className={colClasses}>{children}</div>;
};
export default Col;

/* 
const Col = ({
	children, xs = "1", sm = "2", md = "3", lg = "4", marginBottom, textAlign = "left", flexDirection="column", justifyContent="flex-start", alignItems="flex-start"
}) => {
	let colClasses = cx({
		col: true,
		//These column sizes should either be percentages of width, or expected number. ex: On a large page, 4 col is expected, so it should do 100%/4=25% available to each. Small page should be 2 expected 100%/2=50% avail
		[`col-sm-${xs}`]: xs,
		[`col-sm-${sm}`]: sm,
		[`col-md-${md}`]: md,
		[`col-lg-${lg}`]: lg,
		colCount : colCount
		[`text-align-${textAlign}`]: textAlign,
		[`margin-bottom-${marginBottom}`]: marginBottom,
		[`flex-direction-${flexDirection}`]: flexDirection,
		[`justify-content-${justifyContent}`]: justifyContent,
		[`align-items-${alignItems}`]: alignItems,
	})
}
*/
