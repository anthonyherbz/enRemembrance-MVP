import styles from "./actionicons.module.scss"
import Icon from "../icons/Icon"
import { useState } from "react"
import BlockingOverlay from "../overlay/BlockingOverlay"
import Menu from "../menu/Menu"

const ActionIcons = ({ old, published, story_id, user_id }) => {
	const [deleteState, setDeleteState] = useState(false)
	const [moreState, setMoreState] = useState(false)
	function handleDeleteClick() {
		setDeleteState(!deleteState)
	}
	function handleMoreClick() {
		setMoreState(!moreState)
	}
	function handleMoreMouseOff() {
		setMoreState(false)
	}
	async function deleteStory() {
		const apiUrlEndpoint = "/api/deletestory-lib"
		const postData = {
			method: "Post",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				id: story_id,
				user_id: user_id
			}),
		}
		// postData sends info to the API. Using to specify ID of item to request
		const response = await fetch(apiUrlEndpoint, postData)
		const res = await response.json()
		console.log(res)
	}
	const moreLinks = [
		{
			item: "make-copy",
			slug: "book",
		},
		{
			item: "item2",
			slug: "book",
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
					passedFunction={deleteStory}>
					Are you sure you want to delete this book?
				</BlockingOverlay>
			) : null}

			<div>
				<Icon name='print' color='#000' width='2em' height='2em' />
			</div>
			<div>
				<Icon name='pdf' color='#000' width='2em' height='2em' />
			</div>
			{published ? null : (
				<div onClick={handleDeleteClick}>
					<Icon name='trash' color='#000' width='2em' height='2em' />
				</div>
			)}
			<div
				className={styles.moreParent}
				onClick={handleMoreClick}
				onMouseLeave={handleMoreMouseOff}>
				<Icon name='more' color='#000' width='2em' height='2em' />
				{moreState ? (
					<div className={styles.moreMenu}>
						<Menu textAlign='right' fontWeight='normal' menuLinks={moreLinks} right />
					</div>
				) : null}
			</div>
		</div>
	)
}
export default ActionIcons
