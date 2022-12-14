import ButtonText from "../button/ButtonText"
import styles from "./createpostdiag.module.scss"
import { useState } from "react"

const CreatePostDiag = ({ id, user_id, setvisPostDiag }) => {
	const [text, setText] = useState()
	const [isDuplicate, setisDuplicate] = useState(0)
	function updateText(event) {
		setText(event.target.value)
	}
	async function createPost() {
		const apiUrlEndpoint = "/api/checkdupe-lib"
		const postData = {
			method: "Post",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				searchID: id,
				matchID: user_id,
				type: "post",
			}),
		}
		const response = await fetch(apiUrlEndpoint, postData)
		const res = await response.json()
		let duplicate = res.isDuplicate[0].result
		setisDuplicate(duplicate)
		
		async function savePost() {
			setvisPostDiag(false)
			const apiUrlEndpoint = "/api/createpost-lib"
			const postData = {
				method: "Post",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					user_id: user_id,
					story_id: id,
					content: text,
				}),
			}
			const response = await fetch(apiUrlEndpoint, postData)
			const res = await response.json()
			// console.log(res)
		}
		if (duplicate == 0) savePost() 
	}

	return (
		<>
			<div className={styles.cpd}>
				Say something about this story!
				<textarea maxLength='250' onChange={updateText} />
				<div onClick={() => createPost()}>
					<ButtonText color='yellow'>Post</ButtonText>
				</div>
				{isDuplicate == 1 ? (
					<div className={styles.dupe}>
						Sorry, you&apos;ve already created a post about this story.
					</div>
				) : null}
			</div>
			<div onClick={() => setvisPostDiag(false)} className={styles.clickcapture}></div>
		</>
	)
}
export default CreatePostDiag
