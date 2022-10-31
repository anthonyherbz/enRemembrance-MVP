//Logo component to display SVG next to text in chosen font
//reqs: Icon, link, text
//props: color, backgroundcolor, clickbehavior
//STATUS: Functional
//TODO: per-instance size control

import Icon from "./icons/Icon";
import Text from "../components/Text";
import Link from "next/link";
import styles from "./logo.module.scss";
import classNames from "classnames/bind";
let cx = classNames.bind(styles);

const Logo = ({hover, size="1x"}) => {
	// let svg = "path";
	let logoClasses = cx({
		logo: true,
		hover: hover,
		[`size-${size}`] : size,
	});
	return (
		<Link href='/'>
				<div className={logoClasses}>
					<Icon name="logo" color="#629aba" width="25" height="25"/>
					<Text color='blue' size='1em' fontWeight='bold'>
						enRemembrance
					</Text>
				</div>
		</Link>
	);
};
export default Logo;
