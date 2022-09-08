import Icon from "../icons/Icon";
import NoSsr from "../NoSsr"

const statusIcons = ({ book, old }) => {
	// console.log(book)
	const { published, visible, monetized } = book;
	// console.log(published, visible, monetized )
	let red = "#bd423a";
	let active = "#41ba2d";
	let inactive = "rgba(209, 209, 209, 1)";
	// let red = "#bd423a";
	if ((published) ) {
		return (
			// style={{ display: "flex", justifyContent: "center" }}
			<div style={{display: "flex", justifyContent: "center"}}>
				<Icon name='published' color={active} />
				{visible ? (
					<Icon name='visible' color={active} />
				) : (
					<Icon name='visible' color={inactive} />
				)}
				{monetized ? (
					<Icon name='monetized' color={active} />
				) : (
					<Icon name='monetized' color={inactive} />
				)}
			</div>
		);
	} else {
		return (
			<NoSsr>
				<div style={{ display: "flex", justifyContent: "center"}}>
					{old ? (
						<Icon name='edit' color={red} />
					) : (
						<Icon name='edit' color={active} />
					)}
				</div>
			</NoSsr>
		);
	}
};
export default statusIcons;
