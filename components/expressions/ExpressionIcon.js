import { IconContext } from "react-icons/lib"
import { useState, useEffect } from "react"


const ExpressionIcon = ({ expression, styles, count, update_id, type }) => {
	//handle whether the particular tip will be shown
	const [showTip, setShowTip] = useState(0)
	const [counter, setCounter] = useState(count)
	const [hasUpdated, setHasUpdated] = useState(false)
	useEffect(() => {
		async function	getData(){
			
		}
	}, [])
	async function handleClose() {
		handleHover()
	}
	// console.log(post_id)

	function handleHover() {
		setShowTip(!showTip)
	}
	// console.log(expression)
	// function handleLeave() {
	// 	setShowTip((showTip = 0));
	// }
	
	async function increment() {
		if (!hasUpdated) {
			setHasUpdated(true)
			let c = counter
			setCounter(c + 1)
			const endpoint = "/api/updateExpressionCounter-lib"
			const postData = {
				method: "Post",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					update_id: update_id,
					countVal: c + 1,
					expression: expression.id,
					type: type,
				}),
			}
			const response = await fetch(endpoint, postData)
			const res = await response.json()
			console.log(res)
		}
	}
	return (
		<div onMouseEnter={handleHover} onMouseLeave={handleClose}>
			{/* show the tip on hover, hide the tip on leave */}
			<div className={styles.icon}>
				<IconContext.Provider value={{ size: "2em" }}>
					<div onClick={() => increment()}>{expression.icon}</div>
				</IconContext.Provider>
				{counter != 0 ? <div className={styles.counter}>{counter}</div> : null}
			</div>
			{showTip ? <div className={styles.desc}>{expression.description}</div> : null}
		</div>
	)
}
export default ExpressionIcon
