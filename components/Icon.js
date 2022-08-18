//Displays variable-sized SVG
//Reqs: image
//Props: width, height, color,

import Image from "next/image";
import styles from "./icon.module.scss";
import classNames from "classnames/bind";
let cx = classNames.bind(styles);

//TODO: support changing the SVG fill color dynamically

const Icon = ({ name, alt = "alt text", width = "50", height = "50", color = "black"}) => {
	return (
			<Image
				src={`/images/icons/${name}_${color}.svg`}
				alt={alt}
				width={width}
				height={height}
			/>
	);
};
export default Icon;
