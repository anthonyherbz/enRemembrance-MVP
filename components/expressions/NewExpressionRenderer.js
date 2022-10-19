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

	console.log("type", type, "templ", templ)

	function increment() {
		async function handleUpdate(incrementVal, hasUpdateVal, counterNull) {
			setHasUpdated(hasUpdateVal)
			let c
			if (count == null) {
				c = null
				setCounter(1)
			} else {
				c = counter + incrementVal
				setCounter(c)
			}

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
			<div className={styles.icon} onClick={() => increment()}>
				<Image src={templ.image_path} layout='fill' />
				{counter != null ? <div className={styles.counter}>{counter}</div> : null}
			</div>
			{showTip ? (
				<div className={styles.desc}>
					{templ.name} - {templ.description}
				</div>
			) : null}
		</div>
	)
}
export default NewExpressionRenderer
