//Logo component to display SVG next to text in chosen font
//reqs: Icon, link, text
//props: color, backgroundcolor, clickbehavior
//STATUS: Functional
//TODO: per-instance size control

import Icon from "../components/Icon";
import Text from "../components/Text";
import Link from "next/link";
import styles from "./logo.module.scss";

const Logo = () => {
	return (
		<Link href='localhost:3000'>
			<a>
				<div className={styles.logo}>
					<Icon
						name='logo_temp'
						color='blue'
						alt='enRemembrance icon'
						width='50'
						height='50'
					/>
					<Text color='blue' size='1em' fontWeight='bold'>
						enRemembrance
					</Text>
				</div>
			</a>
		</Link>
	);
};
export default Logo;
