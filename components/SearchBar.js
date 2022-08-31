//Current usage: Primary feed and dashboard
//Take input and search site for content. Will probably need to be a 3rd party search implementation
//Should also be able to display an overlay of a category carousel
//Requires: Row, TextInput, Icon
import classNames from "classnames/bind";
import Col from "./Col";
import Row from "./Row";
import styles from "./searchbar.module.scss";
import Image from "next/image";
let cx = classNames.bind(styles);
import { useState } from "react";

const SearchBar = () => {
	return (
		<div className={styles.searchbar}>
			<form className={styles.box}>
				<input type='text' />
			</form>

			<div className={styles.sbutton}>
				<Image width="25" height="25" src="/images/icons/search.png"/>
			</div>
		</div>
	);
};
export default SearchBar;
