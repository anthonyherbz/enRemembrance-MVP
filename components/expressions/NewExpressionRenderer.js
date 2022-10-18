import Image from "next/image"
import { useState } from "react"

const NewExpressionRenderer = ({ update_id, count, templ, styles, type }) => {
	const [showTip, setShowTip] = useState(0)
	const [counter, setCounter] = useState(count)
	const [hasUpdated, setHasUpdated] = useState(false)

	async function handleClose() {
		handleHover()
	}

	function handleHover() {
		setShowTip(!showTip)
	}

	function increment() {
		async function handleUpdate(incrementVal, hasUpdateVal) {
			setHasUpdated(hasUpdateVal)
			let c = counter + incrementVal
			setCounter(c)
			const endpoint = "/api/updateExpressionCounter-lib"
			const postData = {
				method: "Post",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					update_id: update_id,
					countVal: c,
					expression: templ.id,
					type: type,
				}),
			}
			const response = await fetch(endpoint, postData)
			const res = await response.json()
			console.log(res)
		}
		if (!hasUpdated) handleUpdate(1, true)
		if (hasUpdated) handleUpdate(-1, false)
	}

	return (
		<div onMouseEnter={handleHover} onMouseLeave={handleClose}>
			{/* show the tip on hover, hide the tip on leave */}
			<div className={styles.icon}>
				<div onClick={() => increment()}>
					<Image src={templ.image_path} width="35px" height="35px"/>
				</div>
				{counter != 0 ? <div className={styles.counter}>{counter}</div> : null}
			</div>
			{showTip ? <div className={styles.desc}>{templ.description}</div> : null}
		</div>
	)
}
export default NewExpressionRenderer
