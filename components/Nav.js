import Menu from "./menu/Menu";
import classNames from "classnames/bind";
import { useState } from "react";
import Icon from "./icons/Icon";
import styles from "./nav.module.scss";
let cx = classNames.bind(styles);

const Nav = ({iconSize="30", topSpace="50"}) => {
	const navLinks = [
		{
			item: "Home",
			slug: "/",
		},
		{
			item: "About",
			slug: "about",
		},
		{
			item: "Contact",
			slug: "contact",
		},
		{
			item: "Terms and Conditions",
			slug: "termsandconditions",
		},
		{
			item: "Support",
			slug: "support",
		},
		{
			item: "Welcome",
			slug: "welcome",
		},
		{
			item: "Testing",
			slug: "testing",
		},
		{
			item: "Dashboard",
			slug: "dashboard",
		},
		{
			item: "Post",
			slug: "postpage",
		},
		{
			item: "Author",
			slug: "authorpage",
		},
		{
			item: "Editor",
			slug: "editor",
		},
	];
	const navIcons = [
		{
			item: <Icon color='#000' name='home' width={iconSize} height={iconSize} />,
			slug: "home",
		},
		{
			item: <Icon color='#000' name='book' width={iconSize} height={iconSize} />,
			slug: "home",
		},
		{
			item: <Icon color='#000' name='info' width={iconSize} height={iconSize} />,
			slug: "home",
		},
		{
			item: <Icon color='#000' name='mail' width={iconSize} height={iconSize} />,
			slug: "home",
		},
		{
			item: <Icon color='#000' name='question' width={iconSize} height={iconSize} />,
			slug: "home",
		},
		{
			item: <Icon color='#000' name='contract' width={iconSize} height={iconSize} />,
			slug: "home",
		},
	];
	const [expanded, setExpanded] = useState(false);
	let navClasses = cx({
		nav: true,
		[`topSpace-${topSpace}`] : topSpace,
	});
	function handleClick() {
		setExpanded(!expanded);
	}

	return (
		<>
			{expanded ? (
				<div className={navClasses}>
					<div onClick={handleClick} className={styles.arrowLeft}>
						<Icon
							name='arrow'
							rotate='180'
							color='#000'
							width={iconSize}
							height={iconSize}
						/>
					</div>
					<Menu menuLinks={navLinks} />
				</div>
			) : (
				<div className={navClasses}>
					<div onClick={handleClick} className={styles.arrowRight}>
						<Icon
							name='arrow'
							rotate='0'
							color='#000'
							width={iconSize}
							height={iconSize}
						/>
					</div>
					<Menu menuLinks={navIcons} />
				</div>
			)}
		</>
	);
};
export default Nav;
