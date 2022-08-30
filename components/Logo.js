//Logo component to display SVG next to text in chosen font
//reqs: Icon, link, text
//props: color, backgroundcolor, clickbehavior
//STATUS: Functional
//TODO: per-instance size control

import Icon from "./icons/Icon";
import Text from "../components/Text";
import Link from "next/link";
import styles from "./logo.module.scss";

const Logo = () => {
	// let svg = "path";
	return (
		<Link href='/'>
			<a>
				<div className={styles.logo}>
					<Icon name="logo" color="#629aba" width="25" height="25"/>
					<Text color='blue' size='1em' fontWeight='bold'>
						enRemembrance
					</Text>
				</div>
			</a>
		</Link>
	);
};
export default Logo;
