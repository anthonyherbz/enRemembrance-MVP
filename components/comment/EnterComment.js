import styles from "./entercomment.module.scss"
import { useState,useContext } from "react"
import classNames from "classnames/bind";
import { UserContext } from "../../pages/_app"

let cx = classNames.bind(styles);

const EnterComment = ({
	post_id,
	story_id,
	toggleComment,
}) => {

	const { loggedInUser, setLoggedInUser } = useContext(UserContext)
	let logged_in_user_id = loggedInUser.userID
	const [text, setText] = useState("")
	// console.log(text)
	function updateText(event) {
		setText(event.target.value)
	}
	async function submitComment(event) {
		event.preventDefault()
		// console.log("submit comment")
		// console.log("queried")
		const apiUrlEndpoint = "/api/createcomment-lib"
		const postData = {
			method: "Post",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				post_id: post_id,
				story_id: story_id,
				user: logged_in_user_id,
				text: text,
			}),
		}
		const response = await fetch(apiUrlEndpoint, postData)
		const res = await response.json()
		// console.log(res)
		toggleComment()
	}
	return (
		<div className={styles.enterComment}>
			<div className={styles.form}>
				<form onSubmit={submitComment}>
					<span onClick={() => {toggleComment()}}>x</span>
					<label htmlFor='commentext'>Leave the author a comment!</label>
					<textarea onChange={updateText} name='commentext' type='textarea'></textarea>
					<button type="submit"  htmlFor='commenttext'>
						Add your comment
					</button>
				</form>
			</div>
		</div>
	)
}
export default EnterComment
