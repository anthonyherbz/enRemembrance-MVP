//Displays variable-sized SVG
//Reqs: image
//Props: width, height, color,

import Image from "next/image";
import styles from "./icon.module.scss";
import classNames from "classnames/bind";
let cx = classNames.bind(styles);

//TODO: support changing the SVG fill color dynamically

// const Icon = ({
// 	iconName,
// 	alt = "alt text",
// 	width = "100",
// 	height = "100",
// 	color = "black",
// }) => {
// 	return (
// 		<Image
// 			src={`/images/icons/${iconName}_${color}.svg`}
// 			alt={alt}
// 			width={width}
// 			height={height}
// 			// layout="responsive"
// 		/>
// 	);
// };
// export default Icon;

const Icon = ({
	iconName,
	svg,
	alt = "alt text",
	width = "50",
	height = "50",
	color = "blue",
}) => {
	let iconClasses = cx({
		svg: true,
		[`color-${color}`]: color,
	});
	return (
		<object
			className={styles.svg}
			width={width}
			height={height}
			type='image/svg+xml'
			data={`/images/icons/${iconName}.svg`}
		>
			{alt} SVG
		</object>
	);
};
export default Icon;
