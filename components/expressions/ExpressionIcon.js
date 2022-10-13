import { IconContext } from "react-icons/lib"
import { useState } from "react"
const ExpressionIcon = ({ expression, styles }) => {
	//handle whether the particular tip will be shown
	const [showTip, setShowTip] = useState(0)
	function handleHover() {
		setShowTip(!showTip)
	}
	// function handleLeave() {
	// 	setShowTip((showTip = 0));
	// }
	return (
		<div onMouseEnter={handleHover} onMouseLeave={handleHover}>
			{/* show the tip on hover, hide the tip on leave */}
			<div className={styles.icon}>
				<IconContext.Provider value={{ size: "3em" }}>
					<div>{expression.icon}</div>
				</IconContext.Provider>
				<div className={styles.counter}>{expression.count}</div>
			</div>
			{showTip ? <div className={styles.desc}>{expression.description}</div> : null}
		</div>
	)
}
export default ExpressionIcon
