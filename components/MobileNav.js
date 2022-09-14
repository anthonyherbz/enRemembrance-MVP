import Icon from "./icons/Icon";
import Menu from "./menu/Menu";
import styles from './mobilenav.module.scss'

const MobileNav = ({iconSize="30", topSpace="50"}) => {
	const navLinks = [
		{
			item: "Home",
			slug: "",
		},
		{
			item: "Books",
			slug: "dashboard",
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
			item: "About",
			slug: "about",
		},
	];
	const navIcons = [
		{
			item: (
				<Icon
					color='#000'
					name='home'
					width={iconSize}
					height={iconSize}
				/>
			),
			slug: "",
		},
		{
			item: (
				<Icon
					color='#000'
					name='book'
					width={iconSize}
					height={iconSize}
				/>
			),
			slug: "dashboard",
		},
		{
			item: (
				<Icon
					color='#000'
					name='mail'
					width={iconSize}
					height={iconSize}
				/>
			),
			slug: "contact",
		},
		{
			item: (
				<Icon
					color='#000'
					name='contract'
					width={iconSize}
					height={iconSize}
				/>
			),
			slug: "termsandconditions",
		},
		{
			item: (
				<Icon
					color='#000'
					name='info'
					width={iconSize}
					height={iconSize}
				/>
			),
			slug: "about",
		},
	];
	return(
		<div className={styles.mobilenav}>
			<Menu horizontal="true" center menuLinks={navIcons} isMobile/>
		</div>
	)
};
export default MobileNav;
