//Extremely flexible component clickable
//Must: resize in accordance with content, but have variable padding. Variable color in accordance with palette, customizeable border color, font size, text content, text stacking/wrapping, max width/height, text only, icon only, both, execute action on click with JS
//Reqs: Text, Icon, link
//Props: max-width, max-height, text-size, text-color, backgroundcolor, outline-color, link, type(icon,text/IT), wrap, border-weight, border(y/n), transparency
import classNames from "classnames/bind";
import styles from "./buttontext.module.scss";
import Link from "next/link";
import Icon from "./Icon";
import { useState } from "react";

let cx = classNames.bind(styles);

const ButtonText = ({path, size, color, fill, alt, label }) => {
	let buttonTextClasses = cx({
		buttn: true,
		fill: fill === "true",
		unfill: fill === "false",
		[`color-${color}`]: color,
		size: size,
	});
	return (
		<div>
			<button className={buttonTextClasses}>
				{path ? (
					// conditional-- if path is not empty, return button with a link, if path is empty return only button with label
					<div className={styles.btnTxtParent}>
						<Link href={path}>
							<a>{label}</a>
						</Link>
					</div>
				) : (
					<div className={styles.btnTxtParent}>{label}</div>
				)}
			</button>
		</div>
	);
};
export default ButtonText;
