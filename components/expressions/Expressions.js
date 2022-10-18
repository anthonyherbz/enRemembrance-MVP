//Minified expression component that shows a summarized row of expressions that have been made on a post or book
//Reqs: Icon, Row
//Props: used-expressions
import { BsFlower1 as Daisy, BsFlower3 as FMN } from "react-icons/bs"
import { GiSpotedFlower as Daffodil, GiLotusFlower, GiTrefoilLily, GiPoppy } from "react-icons/gi"
import NewExpressionRenderer from "./NewExpressionRenderer"
import { TbHandClick as Snap } from "react-icons/tb"
import Image from "next/image"
import { useState, useEffect } from "react"
import ExpressionIcon from "./ExpressionIcon"
import styles from "./expressions.module.scss"
import classNames from "classnames/bind"
let cx = classNames.bind(styles)

const Expressions = ({ expressions, setShowExp, type, align, template }) => {
	//defines list of expressions with count. In final version, count should be expored from the relevant expressions table
	const expressionStyleVars = cx({
		popup: true,
		default: align === "default",
		left: align === "left",
		right: align === "right",
	})
	let search_id
	if (expressions.length != 0 && type == "story") {
		search_id = expressions[0].story_id
	}
	if (expressions.length != 0 && type == "post") {
		search_id = expressions[0].post_id
	}
	console.log(search_id)
	const [expData, setExpData] = useState()
	useEffect(() => {
		async function getData() {
			const endPoint = "/api/getExpressionsCount-lib"
			const postData = {
				method: "Post",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					search_id: search_id,
					type: type,
				}),
			}
			const response = await fetch(endPoint, postData)
			const res = await response.json()
			setExpData(res.expressions)
			console.log(res)
		}
		getData()
	}, [])
	const expList = [
		{
			id: 1,
			icon: <GiLotusFlower />,
		},
		{
			id: 2,
			icon: <GiTrefoilLily />,
		},
		{
			id: 3,
			icon: <GiPoppy />,
		},
		{
			id: 4,
			icon: <Daffodil />,
		},
		{
			id: 5,
			icon: <Daisy />,
		},
		{
			id: 6,
			icon: <FMN />,
		},
		{
			id: 7,
			icon: <Snap />,
		},
	]
	console.log("expressionssss", expressions)
	console.log("expData", expData)
	console.log("template", template)
	if (expData != undefined) {
		return (
			<div className={expressionStyleVars} onMouseLeave={() => setShowExp(0)}>
				{template.map((templ) => {
					let filteredData = expData.filter(function (expr) {
						return expr.expression_id == templ.id
					})
					let count = filteredData[0].count
					console.log("filteredData", filteredData)
					let update_id
					if (type == "post") {
						update_id = expressions[0].post_id
					}
					if (type == "story") {
						update_id = expressions[0].story_id
					}
					return (
						<div key={templ.id}>
							<NewExpressionRenderer
								update_id={update_id}
								count={count}
								templ={templ}
								styles={styles}
								type={type}
							/>
						</div>
					)
				})}
			</div>
		)
	}

	// if (expData != undefined) {
	// 	return (
	// 		<div className={expressionStyleVars} onMouseLeave={() => setShowExp(0)}>
	// 			{expList.map((expression, index) => {
	// 				let fexp = expData.filter(function (expr) {
	// 					return expr.expression_id == expression.id
	// 				})
	// 				let count
	// 				let update_id
	// 				let desc
	// 				let summary
	// 				let eName
	// 				if (fexp[0] == undefined) {
	// 					count = 0
	// 					update_id = null
	// 					desc = null
	// 				} else {
	// 					count = fexp[0].count
	// 					summary = fexp[0].summary_description
	// 					eName = fexp[0].summary_name
	// 					desc = eName + " - " + summary
	// 					if (type == "post") {
	// 						update_id = fexp[0].post_id
	// 					}
	// 					if (type == "story") {
	// 						update_id = fexp[0].story_id
	// 					}
	// 				}

	// 				// console.log(count)
	// 				return (
	// 					<div key={index} className={styles.expression}>
	// 						<ExpressionIcon
	// 							type={type}
	// 							expression={expression}
	// 							update_id={update_id}
	// 							count={count}
	// 							description={desc}
	// 							styles={styles}
	// 						/>
	// 					</div>
	// 				)
	// 			})}
	// 		</div>
	// 	)
	// }
}
export default Expressions
