import NewExpressionRenderer from "./NewExpressionRenderer"
import { useState, useEffect } from "react"
import styles from "./expressions.module.scss"
import classNames from "classnames/bind"
let cx = classNames.bind(styles)

const Expressions = ({ setShowExp, type, align, template, parent_id }) => {
	const expressionStyleVars = cx({
		popup: true,
		default: align === "default",
		left: align === "left",
		right: align === "right",
	})

	const [expData, setExpData] = useState()
	useEffect(() => {
		async function getData() {
			const endPoint = "/api/getExpressionsCount-lib"
			const postData = {
				method: "Post",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					search_id: parent_id,
					type: type,
				}),
			}
			const response = await fetch(endPoint, postData)
			const res = await response.json()
			setExpData(res.expressions)
			// console.log(res)
		}
		getData()
	}, [parent_id, type])
	
	if (expData != undefined) {
		return (
			<div className={expressionStyleVars} onMouseLeave={() => setShowExp(0)}>
				{template.map((templ) => {
					let filteredData = expData.filter(function (expr) {
						return expr.expression_id == templ.id
					})
					// console.log(filteredData[0])
					let count
					if (filteredData[0] == undefined) {
						count = null
					} else {
						count = filteredData[0].count
					}

					return (
						<div key={templ.id}>
							<NewExpressionRenderer
								update_id={parent_id}
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
}
export default Expressions
