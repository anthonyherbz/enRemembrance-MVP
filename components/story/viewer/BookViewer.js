//View a completed book. Includes page turning buttons and page count beneath main view, clickable regions on the outer 25% vertical of pages to navigate between pages
//Reqs: Button, BookText, BookPhoto
//Props:

import styles from "./bookviewer.module.scss"
import { useState } from "react"
import BookPage from "./BookPage"
import Icon from "../../icons/Icon"
const BookViewer = ({ story }) => {
	const [position, setPosition] = useState(1) //set this back to 0 when done testing

	if (story.page_json == undefined || story.page_json == "") {
		return <div>Sorry, there&apos;s something wrong with the format of this story</div>
	}
	const pages = story.page_json.story.pages

	//Function to increment the position
	function addPos() {
		//Prevents error of position of second page outrunning pages length
		if (position <= pages.length - 3) {
			// console.log("addpos")			//If pos is less than 1 (aka 0) increment by 1
			//Allows showing cover at position 0 and page 1 and 2 at postion 1
			if (position < 1) {
				setPosition(position + 1)
			}
			//Otherwise, add two to pos
			else {
				setPosition(position + 2)
			}
		}
	}
	//Function to decrement the position
	function subPos() {
		if (position >= 2) {
			setPosition(position - 2)
		} else if (position >= 1) {
			setPosition(position - 1)
		}
	}

	function addPosMobile() {
		if (position < pages.length - 1) {
			setPosition(position + 1)
		}
	}
	function subPosMobile() {
		if (position >= 1) {
			setPosition(position - 1)
		}
	}

	return (
		<div className={styles.bookParent}>
			<div className={styles.bookViewer}>
				{position > 0 ? (
					<>
						<BookPage pos={position} page={pages[position]} />
						<BookPage pos={position} page={pages[position + 1]} />
					</>
				) : (
					<>
						<BookPage pos={position} page={pages[position]} />
					</>
				)}
			</div>
			<div className={styles.bookController}>
				<div onClick={subPos}>
					<Icon name='arrow' rotate='180' />
				</div>
				<div onClick={addPos}>
					<Icon name='arrow' />
				</div>
			</div>
			<div className={styles.mobile}>
				<div className={styles.bookViewerMobile}>
					<BookPage pos={position} page={pages[position]} />
				</div>
				<div className={styles.bookController}>
					<div onClick={subPosMobile}>
						<Icon name='arrow' rotate='180' />
					</div>
					<div onClick={addPosMobile}>
						<Icon name='arrow' />
					</div>
				</div>
			</div>
		</div>
	)
}
export default BookViewer
