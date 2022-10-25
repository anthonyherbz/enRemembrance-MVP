//Page header containing logo, search bar, and profile arrayed in a row
//May be hidden on focused pages like editor, book preview, author page, post page
//Position: fixed over top of content on top of page
//Reqs: Logo, SearchBar, Profile
//Props: show, hide

import Logo from "../Logo";
import SearchBar from "./SearchBar";
import Profile from "./Profile";
import styles from "./header.module.scss";
import classNames from "classnames/bind";
import Carousel from "./Carousel";
import SearchInterface from './SearchInterface'
import { useState, useEffect } from "react";

let cx = classNames.bind(styles);




const Header = ({ show, shadow }) => {
	let headerClasses = cx({
		header: true,
		show: show,
		shadow: shadow,
	});
	let [expanded, setExpanded] = useState(false);
	const [expand, setExpand] = useState(false)

	let [showCarousel, setShowCarousel] = useState(false);
	const [categories, setcategories] = useState();
	function handleMouseEnter() {
		setExpanded((expanded = true));
	}

	function handleMouseLeave() {
		setExpanded((expanded = false));
	}


	let user = "Jane Doe";
	let logged_in_user_id = 1
	return (
		<div className={headerClasses} onMouseLeave={() => setExpand(false) }>
			<div className={styles.pos1}>
				<Logo hover size='1-5x' />
			</div>
			<div className={styles.pos2}>
				<SearchInterface
				expand={expand} // hold onto expand states so they persist between desktop/mobile
				setExpand={setExpand}
				/>
				
			</div>
			<div
				onMouseEnter={handleMouseEnter}
				onMouseLeave={handleMouseLeave}
				className={styles.pos3}
			>
				<Profile
					user={user}
					userLink={logged_in_user_id}
					expanded={expanded}
					setExpanded={setExpanded}
				/>
			</div>
		</div>
	);
};
export default Header;
