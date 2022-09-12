//Current usage: Primary feed and dashboard
//Take input and search site for content. Will probably need to be a 3rd party search implementation
//Should also be able to display an overlay of a category carousel
//Requires: Row, TextInput, Icon
import classNames from "classnames/bind";
import styles from "./searchbar.module.scss";
import Image from "next/image";
// import {useState} from './react'
let cx = classNames.bind(styles);

const SearchBar = ({showCarousel, setShowCarousel}) => {
	function handleSearchClick(){
		setShowCarousel(showCarousel=1)
	}
	return (
		<div className={styles.searchbar}>
			<form className={styles.box}>
				<input type='text' onClick={handleSearchClick}/>
			</form>

			<div className={styles.sbutton}>
				<Image width="25" height="25" src="/images/icons/search.png"/>
			</div>
		</div>
	);
};
export default SearchBar;
