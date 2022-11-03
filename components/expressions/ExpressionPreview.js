//Arrays the different expressions horizontally and shows their description on hover
import {	GiButterflyFlower} from "react-icons/gi"
import { useState } from "react"
import Image from "next/image"
import styles from "./expressionspreview.module.scss"
import Expressions from "./Expressions"
const ExpressionPreview = ({ align = "default", expressions, template, type, parent_id }) => {
	// console.log(expressions)
	// console.log(parent_id)
	// console.log("align", align)
	// console.log("exp", expressions)
	let [showExp, setShowExp] = useState(0)
	// console.log(template)

	const selectedExpressions = (
		<>
			{expressions.map((expression, index) => {
				return (
					<div key={index}>
						<Image width='25' height='25' src={expression.image_path} alt={`Expression ${expression}`}/>
					</div>
				)
			})}
			{/* {expressions.map((exp, index) => {
				if (exp.count > 0) {
					let fvp = valuePairs.filter(function (vp) {
						return vp.id == exp.expression_id
					})
					// console.log(fvp)
					return <div key={index}>{fvp[0].icon}</div>
				}
			})} */}
		</>
	)
	// console.log(selectedExpressions)
	// console.log('showx', showExp)
	return (
		<>
			<div onClick={() => setShowExp(1)}>
				{expressions.length != 0 ? (
					<div className={styles.expressionPreview}>{selectedExpressions}</div>
				) : (
					<div className={styles.expressionPreview}>
						<GiButterflyFlower />
					</div>
				)}
				<div className={styles.expressionsMobile}>
					<GiButterflyFlower />
				</div>
			</div>
			<div>
				{showExp ? (
					<Expressions
						type={type}
						expressions={expressions}
						align={align}
						setShowExp={setShowExp}
						template={template}
						parent_id={parent_id}
					/>
				) : null}
			</div>
		</>
	)
}
export default ExpressionPreview
