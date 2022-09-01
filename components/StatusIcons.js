import Icon from "./icons/Icon";

const statusIcons = ({ book, old }) => {
	// console.log(book)
	const { published, visible, monetized } = book;
	// console.log(published, visible, monetized )
	let active = "#41ba2d";
	let inactive = "rgba(209, 209, 209, 1)";
	let red = "#bd423a";
	if (published || visible || monetized) {
		// console.log("returned true");
		return (
			// style={{ display: "flex", justifyContent: "center" }}
			<div style={{display: "flex", justifyContent: "center"}}>
				{published ? (
					<Icon name='published' color={active} />
				) : (
					<Icon name='published' color={inactive} />
				)}
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
			<div style={{ display: "flex", justifyContent: "center"}}>
				{old ? (
					<Icon name='edit' color={red} />
				) : (
					<Icon name='edit' color={active} />
				)}
			</div> //color is red or green
		);
	}
};
export default statusIcons;
