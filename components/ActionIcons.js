import styles from "./actionicons.module.scss";
import Icon from "./icons/Icon";
import { useState } from "react";
import BlockingOverlay from "./overlay/BlockingOverlay";
import Menu from "./menu/Menu";

const ActionIcons = ({ old, published }) => {
	const [deleteState, setDeleteState] = useState(false);
	const [moreState, setMoreState] = useState(false);
	function handleDeleteClick() {
		setDeleteState(!deleteState);
	}
	function handleMoreClick() {
		setMoreState(!moreState);
	}
	function handleMoreMouseOff(){
		setMoreState(false);
	}
	const moreLinks = [
		{
			item: "make-copy",
			slug: "book"
		},
		{
			item: "item2",
			slug: "book"
		},
	]
	return (
		<div className={styles.parent}>
			{deleteState ? (
				<BlockingOverlay
					buttonColor='red'
					buttonText='Delete'
					state={deleteState}
					setState={setDeleteState}
				>
					Are you sure you want to delete this book?
				</BlockingOverlay>
			) : null}

			<div>
				<Icon name='print' color='#000' width='30' height='30' />
			</div>
			<div>
				<Icon name='pdf' color='#000' width='30' height='30' />
			</div>
			{published ? null : (
				<div onClick={handleDeleteClick}>
					<Icon name='trash' color='#000' width='30' height='30' />
				</div>
			)}
			<div className={styles.moreParent} onClick={handleMoreClick} onMouseLeave={handleMoreMouseOff}>
				<Icon name='more' color='#000' width='30' height='30' />
				{moreState ? <div className={styles.moreMenu}><Menu textAlign="right" fontWeight="normal" menuLinks={moreLinks} right/></div> : null}
			</div>
		</div>
	);
};
export default ActionIcons;
