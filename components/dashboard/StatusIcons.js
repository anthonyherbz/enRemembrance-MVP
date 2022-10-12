import Icon from "../icons/Icon";
import NoSsr from "../NoSsr"

const statusIcons = ({ story, old }) => {
	const { published, visible, monetized } = story;
	// console.log(published, visible, monetized )
	let red = "#bd423a";
	let active = "#41ba2d";
	let inactive = "rgba(209, 209, 209, 1)";
	if ((published) ) {
		return (
			<div style={{display: "flex", justifyContent: "center"}}>
				<Icon name='published' width='2.5em' height='2.5em' color={active} />
				{visible ? (
					<Icon name='visible' width='2.5em' height='2.5em' color={active} />
				) : (
					<Icon name='visible' width='2.5em' height='2.5em' color={inactive} />
				)}
				{monetized ? (
					<Icon name='monetized' width='2.5em' height='2.5em' color={active} />
				) : (
					<Icon name='monetized' width='2.5em' height='2.5em' color={inactive} />
				)}
			</div>
		);
	} else {
		return (
				<div style={{ display: "flex", justifyContent: "center"}}>
					{old ? (
						<Icon name='edit' width='2.5em' height='2.5em' color={red} />
					) : (
						<Icon name='edit' width='2.5em' height='2.5em' color={active} />
					)}
				</div>
		);
	}
};
export default statusIcons;
