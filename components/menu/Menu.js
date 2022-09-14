//Menu that accepts items with this syntax {title/iconName:link} and arrays them in a list
//Can be set to go vertically or horizontally. Uses unordered list? Needs to be a11y friendly but lists are more cumbersome than flex
//Items are clickable, will change cursor type, can have hover background change, corner radius
//Reqs: Icon, Row
//Props: hori, vert, margin-btwn-item, hover-color, corner-radius
import styles from "./menu.module.scss";
import classNames from "classnames/bind";
import Link from "next/link";
import Text from '../Text';

let cx = classNames.bind(styles);
//menuLinks takes input of slug and item as objects in an array

const Menu = ({ menuLinks, horizontal, left, center, right, textAlign, fontWeight="bold", isMobile }) => {
	let menuClasses = cx({
		menu: true,
		horizontal: horizontal,
		left: left,
		right: right,
		center: center,
		[`text-alignment-${textAlign}`] : textAlign,
	});

	return (
		<div className={menuClasses}>
			{/* iterate (map) over defined menuLinks, creating a separate Link for each slug with the item name as the text */}
			{menuLinks.map((navLink, index) => {
				return (
					<div key={index}>
						<Link href={`/${navLink.slug}`}>
							<a><Text textAlign={textAlign} fontWeight={fontWeight} size="">{navLink.item}</Text></a>
						</Link>
					</div>
				);
			})}
		</div>
	);
};
export default Menu;
