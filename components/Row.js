//Flex row that stacks items side by side
//Params: hori (default), vert

import styles from "./row.module.scss";
import classNames from "classnames/bind";

let cx = classNames.bind(styles);

const Row = ({ children, justifyContent, alignItems, nowrap }) => {
	let rowClasses = cx({
		row: true,
		[`justify-content-${justifyContent}`]: justifyContent,
		[`align-items-${alignItems}`]: alignItems,
		nowrap: nowrap,
	});
	return <div className={rowClasses}>{children}</div>;
};
export default Row;
