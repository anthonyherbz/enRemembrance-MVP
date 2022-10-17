//Arrays the different expressions horizontally and shows their description on hover
//Reqs: Icon, Row
//Props: icon-color, row-spacing,
import { BsFlower1 as Daisy, BsFlower3 as FMN } from "react-icons/bs"
import { GiSpotedFlower as Daffodil, GiLotusFlower, GiTrefoilLily, GiPoppy, GiButterflyFlower } from "react-icons/gi"
import { TbHandClick as Snap } from "react-icons/tb"
import { useState } from "react"
import { IconContext } from "react-icons"
import Image from "next/image"
import styles from "./expressionspreview.module.scss"
import Expressions from "./Expressions"
const ExpressionPreview = ({ align, expressions, type }) => {
	console.log(expressions)

	console.log("align", align)
	console.log("exp", expressions)
	let [showExp, setShowExp] = useState(0)
	
	function hideExp() {
		setShowExp(0)
	}

	const valuePairs = [
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
	// console.log(expressions[0])
	const selectedExpressions = (
		<>
			{expressions.map((exp, index) => {
				if (exp.count > 0) {
					let fvp = valuePairs.filter(function (vp) {
						return vp.id == exp.expression_id
					})
					// console.log(fvp)
					return <div key={index}>{fvp[0].icon}</div>
				}
			})}
		</>
	)

	return (
		<>
			<div onClick={() => setShowExp(1)}>
				<IconContext.Provider value={{ color: "black", size: "1.5em" }}>
					<div className={styles.expressionPreview}>
						{selectedExpressions}
					</div>
					<div className={styles.expressionsMobile}>
						<GiButterflyFlower />
					</div>
				</IconContext.Provider>
				
			</div>
			<div>
				{showExp ? <Expressions type={type} expressions={expressions} setShowExp={setShowExp}/> : null}
			</div>
		</>
	)
}
export default ExpressionPreview
