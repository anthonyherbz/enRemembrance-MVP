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

let cx = classNames.bind(styles);
//STATUS: visible, on/off working
//TODO: fixed size,


const Header = ({ show}) => {
	let headerClasses = cx({
		header: true,
		show: show,
	});
	
	return (
		<div className={headerClasses}>
			<Row justifyContent="space-between" alignItems="center">
				<Logo />
				<SearchBar />
				<Profile />
			</Row>
		</div>
	);
};
export default Header;
