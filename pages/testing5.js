import EnterComment from "../components/post/EnterComment"
import { useState } from "react"

const testing5 = () => {
	const [showComment, setShowComment] = useState(0)
	function toggleComment() {
		setShowComment(!showComment)
	}
	return (
		<>
			<EnterComment
				toggleComment={toggleComment}
				showComment={showComment}
				setShowComment={setShowComment}
			/>
		</>
	)
}
export default testing5
