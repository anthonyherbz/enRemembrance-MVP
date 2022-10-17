//Minified expression component that shows a summarized row of expressions that have been made on a post or book
//Reqs: Icon, Row
//Props: used-expressions
import { BsFlower1 as Daisy, BsFlower3 as FMN } from "react-icons/bs"
import { GiSpotedFlower as Daffodil, GiLotusFlower, GiTrefoilLily, GiPoppy } from "react-icons/gi"
import { TbHandClick as Snap } from "react-icons/tb"
import { useState } from "react"
import ExpressionIcon from "./ExpressionIcon"
import styles from "./expressions.module.scss"

const Expressions = ({ expressions, setShowExp, type }) => {
	//defines list of expressions with count. In final version, count should be expored from the relevant expressions table
	const expList = [
		{
			id: 1,
			description: "Lotus - ex: Rebirth and ressurection",
			icon: <GiLotusFlower />,
		},
		{
			id: 2,
			description: "Lilly - ex: Purity, innocence, rebirth",
			icon: <GiTrefoilLily />,
		},
		{
			id: 3,
			description: "Poppy - ex: Remembrance and consolation",
			icon: <GiPoppy />,
		},
		{
			id: 4,
			description: "Daffodil - ex: Memories, hope, rebirth, forgiveness",
			icon: <Daffodil />,
		},
		{
			id: 5,
			description: "Dasiy - ex: Love, motherhood, childbirth, fertility",
			icon: <Daisy />,
		},
		{
			id: 6,
			description: "Forget Me Not - ex: True love, respect, a promise to always remember",
			icon: <FMN />,
		},
		{
			id: 7,
			description: "Snapping Fingers - ex: Appreciation for the author",
			icon: <Snap />,
		},
	]
	// console.log("expressionssss", expressions)
	return (
		<div className={styles.popup} onMouseLeave={() => setShowExp(0)}>
			{expList.map((expression, index) => {
				let fexp = expressions.filter(function (expr) {
					return expr.expression_id == expression.id
				})
				let count
				let update_id
				if (fexp[0] == undefined) {
					count = 0
					update_id = null
				} else {
					count = fexp[0].count
					if (type=="post"){update_id = fexp[0].post_id}
					if (type=="story"){update_id = fexp[0].story_id}
				}

				// console.log(count)
				return (
					<div key={index} className={styles.expression}>
						<ExpressionIcon type={type} expression={expression} update_id={update_id} count={count} styles={styles} />
					</div>
				)
			})}
		</div>
	)
}
export default Expressions
