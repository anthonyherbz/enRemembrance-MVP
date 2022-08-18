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
	});
	return <div className={colClasses}>{children}</div>;
};
export default Col;
