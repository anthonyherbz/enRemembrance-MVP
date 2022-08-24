//Displays variable-sized SVG
//Reqs: image
//Props: width, height, color,

import Image from "next/image";
import styles from "./icon.module.scss";
import classNames from "classnames/bind";
let cx = classNames.bind(styles);

//TODO: support changing the SVG fill color dynamically

const Icon = ({ name, alt = "alt text", width = "100", height = "100", color = "black"}) => {
	return (
			<Image
				src={`/images/icons/${name}_${color}.svg`}
				alt={alt}
				width={width}
				height={height}
				// layout="responsive"
			/>
	);
};
export default Icon;
