//applies container styles to child items. presently isolates in an 80% width box to highlight the item on screen for development

import styles from "./container.module.scss";
import classNames from "classnames/bind";
let cx = classNames.bind(styles);

const Container = ({ children, marginLeft, marginRight, marginTop, marginBottom }) => {
	let containerClasses = cx({
		container: true,
		marginLeft: marginLeft,
		marginRight: marginRight,
		marginTop: marginTop,
		marginBottom: marginBottom,
	});
	return <div className={containerClasses}>{children}</div>;
};
export default Container;
