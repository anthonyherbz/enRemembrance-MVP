//Menu that accepts items with this syntax {title/iconName:link} and arrays them in a list
//Can be set to go vertically or horizontally. Uses unordered list? Needs to be a11y friendly but lists are more cumbersome than flex
//Items are clickable, will change cursor type, can have hover background change, corner radius
//Reqs: Icon, Row
//Props: hori, vert, margin-btwn-item, hover-color, corner-radius
import styles from "./menu.module.scss";
import classNames from "classnames/bind";
import Link from "next/link";

let cx = classNames.bind(styles);

const Menu = ({ menuLinks, horizontal, left, center, right }) => {
	let menuClasses = cx({
		menu: true,
		horizontal: horizontal,
		left: left,
		right: right,
		center: center,
	});

	return (
		<div className={menuClasses}>
			{/* iterate (map) over defined menuLinks, creating a separate Link for each slug with the item name as the text */}
			{menuLinks.map((navLink, index) => {
				return (
					<Link key={index} href={`/${navLink.slug}`}>
						<a>{navLink.item}</a>
					</Link>
				);
			})}
		</div>
	);
};
export default Menu;
