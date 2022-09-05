//This is the menu that will appear upon hovering over a profile icon
//Requires Icon, Menu, Col
//Props:
import styles from "./profile.module.scss";
import Text from "./Text";
import Image from "next/image";
import { useState } from "react";
import classNames from "classnames/bind";
import Menu from './menu/Menu';
let cx = classNames.bind(styles);

const Profile = ({ user, userLink, expanded, setExpanded }) => {
	let profileClasses = cx({
		profile : true,
	})
	const profileLinks = [
		{
			item : "Your Profile",
			slug : [`authors/${userLink}`]
		},
		{
			item : "Your Books",
			slug : [`authors/${userLink}/books`]
		},
		{
			item : "Settings",
			slug : [`authors/${userLink}/settings`]
		},
		{
			item : "Log Out",
			slug : [`authors/${userLink}/signout`]
		}
	]
	const profileMenu = (
		<Menu menuLinks={profileLinks} right textAlign="right" fontWeight="normal"/>
	)
	return (
		<div className={profileClasses}>
			<div className={styles.profileDisplay}>
				<Text>{user}</Text>
				<Image src='/images/profile.svg' width='25' height='25' />
			</div>
			{expanded ? <div className={styles.expandedMenu}>{profileMenu}</div> : null}
		</div>
	);
};
export default Profile;
