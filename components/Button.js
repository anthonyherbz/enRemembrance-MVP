//Extremely flexible component clickable
//Must: resize in accordance with content, but have variable padding. Variable color in accordance with palette, customizeable border color, font size, text content, text stacking/wrapping, max width/height, text only, icon only, both, execute action on click with JS
//Reqs: Text, Icon, link
//Props: max-width, max-height, text-size, text-color, backgroundcolor, outline-color, link, type(icon,text/IT), wrap, border-weight, border(y/n), transparency
import classNames from "classnames/bind";
import styles from "./button.module.scss";
import Link from "next/Link";
import Icon from "./Icon";
import {useState} from "react";

let cx = classNames.bind(styles);

const Button = ({ label, path, size, color, icon = "null", iconpos, fill, alt }) => {
	let buttonClasses = cx({
		buttn: true,
		fill: fill === "true",
		unfill: fill === "false",
		iconpos: iconpos,
		[`color-${color}`] : color,
		size: size,
	});
	if (icon === "null") {
		console.log(icon)
		return (
			<div>
				<button className={buttonClasses}>
					{path ? (
						// conditional-- if path is not empty, return button with a link, if path is empty return only button with label
						<Link href={path}>
							<a>{label}</a>
						</Link>
					) : (
						label
					)}
				</button>
			</div>
		);
	} else {
		return (
			<div>
				<button className={buttonClasses}>
					{path ? (
						// conditional-- if path is not empty, return button with a link, if path is empty return only button with label
						<Link href={path}>
							<a>
								<Icon name={icon} alt={alt} />
								<div className="text">{label}</div>
							</a>
						</Link>
					) : (
						<div>
							<Icon name={icon} alt={alt} />
								<div>{label}</div>
						</div>
					)}
				</button>
			</div>
		);
	}
};
export default Button;
