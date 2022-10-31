import Logo from "../Logo"
import Profile from "./Profile"
import styles from "./header.module.scss"
import classNames from "classnames/bind"
import SearchInterface from "./SearchInterface"
import { UserContext } from "../../pages/_app"
import { useState, useContext } from "react"

let cx = classNames.bind(styles)

const Header = ({ show, shadow }) => {
	const { loggedInUser, setLoggedInUser } = useContext(UserContext)

	let headerClasses = cx({
		header: true,
		show: show,
		shadow: shadow,
	})
	let [expanded, setExpanded] = useState(false)
	const [expand, setExpand] = useState(false)

	let [showCarousel, setShowCarousel] = useState(false)
	const [categories, setcategories] = useState()
	function handleMouseEnter() {
		setExpanded((expanded = true))
	}

	function handleMouseLeave() {
		setExpanded((expanded = false))
	}
	let user;
	let logged_in_user_id;
	if (!loggedInUser) {
		(user = "..."), (logged_in_user_id = 1)
	} else {
		user = loggedInUser.handle
		logged_in_user_id = loggedInUser.userID
		console.log(loggedInUser, "liu")
	}
	// let user = "Jane Doe";
	// let logged_in_user_id = 1
	return (
		<div className={headerClasses} onMouseLeave={() => setExpand(false)}>
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
				className={styles.pos3}>
				<Profile
					user={user}
					userLink={logged_in_user_id}
					expanded={expanded}
					setExpanded={setExpanded}
				/>
			</div>
		</div>
	)
}
export default Header
