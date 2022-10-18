//Current usage: Primary feed and dashboard
//Take input and search site for content. Will probably need to be a 3rd party search implementation
//Should also be able to display an overlay of a category carousel
//Requires: Row, TextInput, Icon
import classNames from "classnames/bind";
import styles from "./searchbar.module.scss";
import Image from "next/image";
import { useState } from "react";
// import {useState} from './react'
let cx = classNames.bind(styles);

const SearchBar = ({ showCarousel, setShowCarousel }) => {
	const [showBar, setShowBar] = useState(0);
	function handleMobileClick() {
		setShowBar(!showBar);
	}
	function handleSearchClick() {
		setShowCarousel((showCarousel = 1));
	}
	async function handleSubmit(event){
		event.preventDefault
		const data = event.target.query.value
	}
	return (
		<>
			<div className={styles.searchbar}>
				<form className={styles.box} onSubmit={handleSubmit}>
					<input type='text' name='query' placeholder='Search for a "user:" or a "story:"' onClick={handleSearchClick} />
				</form>

				<div className={styles.sbutton}>
					<Image
						width='25'
						height='25'
						src='/images/icons/search.png'
					/>
				</div>
			</div>
			<div className={styles.mobilesearch}>
				<div onClick={handleMobileClick} className={styles.sbutton}>
					<Image
						width='25'
						height='25'
						src='/images/icons/search.png'
					/>
				</div>
				{showBar ? (
					<div className={styles.mobilebox}>
						<form className={styles.box}>
							<input type='text' onClick={handleSearchClick} />
						</form>
					</div>
				) : null}
			</div>
		</>
	);
};
export default SearchBar;
