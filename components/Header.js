//Page header containing logo, search bar, and profile arrayed in a row
//May be hidden on focused pages like editor, book preview, author page, post page
//Position: fixed over top of content on top of page
//Reqs: Logo, SearchBar, Profile
//Props: show, hide

import Logo from "./Logo";
import SearchBar from "./SearchBar";
import Profile from "./Profile";
import Row from "./Row";
import styles from "./header.module.scss";
import classNames from "classnames/bind";
import { useState } from "react";
import { useEffect } from "react";

let cx = classNames.bind(styles);
//STATUS: visible, on/off working
//TODO: fixed size,

const Header = ({ show }) => {
	let headerClasses = cx({
		header: true,
		show: show,
	});
	let [expanded, setExpanded] = useState(false);
	function handleMouseEnter() {
		setExpanded((expanded = true));
	}
	// function handleMouseLeave() {
	// 	const delay = setTimeout(() => setExpanded((expanded = false)), 1000);
	// 	clearTimeout(delay);
	// }

	function handleMouseLeave() {
		setExpanded((expanded = false));
	}

	let user = "Jane Doe";
	let userLink = "janedoe"
	return (
		<div className={headerClasses}>
			<div className={styles.pos1}>
				<Logo hover size='1-5x' />
			</div>
			<div className={styles.pos2}>
				<SearchBar />
			</div>
			<div
				onMouseEnter={handleMouseEnter}
				onMouseLeave={handleMouseLeave}
				className={styles.pos3}
			>
				<Profile
					user={user}
					userLink={userLink}
					expanded={expanded}
					setExpanded={setExpanded}
				/>
			</div>
		</div>
	);
};
export default Header;
