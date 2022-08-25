//Probably use <span>
//Will allow text to be bolded, italicized, super/subscript, color changed, etc
//Props: bold, italic, superscript, subscript, color, highlight, size
import styles from "./text.module.scss";
import classNames from "classnames/bind";
let cx = classNames.bind(styles);

const Text = ({
	children,
	color = "black",
	fontWeight = "normal",
	size = "1em",
	textAlign = "left",
}) => {
	let textClasses = cx({
		text: true,
		[`color-${color}`]: color,
		[`font-weight-${fontWeight}`]: fontWeight,
		[`size-${size}`]: size,
		[`text-align-${textAlign}`]: textAlign,
	});

	return <p className={textClasses}>{children}</p>;
};
export default Text;
