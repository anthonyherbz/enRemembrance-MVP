//Minified expression component that shows a summarized row of expressions that have been made on a post or book
//Reqs: Icon, Row
//Props: used-expressions
import { BsFlower1, BsFlower2, BsFlower3 } from "react-icons/bs";
import { GiSpotedFlower, GiLotusFlower, GiFlowerTwirl } from "react-icons/gi";
import { useState } from "react";
import ExpressionIcon from "./ExpressionIcon";
import styles from "./expressions.module.scss";
const Expressions = ({ setShowExp, showExp }) => {

	//defines list of expressions with count. In final version, count should be expored from the relevant expressions table
	const expList = [
		{
			type: "lotus",
			description: "Lotus - ex: Rebirth and ressurection",
			count: 31,
			icon: <GiLotusFlower />,
		},
		{
			type: "lilly",
			description: "Lilly - ex: Purity, innocence, rebirth",
			count: 22,
			icon: <BsFlower3 />,
		},
		{
			type: "poppy",
			description: "Poppy - ex: Remembrance and consolation",
			count: 23,
			icon: <GiFlowerTwirl />,
		},
		{
			type: "daffodil",
			description: "Daffodil - ex: Memories, hope, rebirth, forgiveness",
			count: 24,
			icon: <BsFlower2 />,
		},
		{
			type: "daisy",
			description: "Dasiy - ex: Love, motherhood, childbirth, fertility",
			count: 25,
			icon: <BsFlower1 />,
		},
		// {
		// 	type: "forgetmenot",
		// 	description:
		// 		"Forget Me Not - ex: True love, respect, a promise to always remember",
		// 	count: 26,
		// },
		// {
		// 	type: "snap",
		// 	description: "Snapping Fingers - ex: Appreciation for the author",
		// 	count: 27,
		// },
	];

	// getExpressions(book.id)
	return (
		//defines div that appears on click of preview icons
		<div className={styles.popup}>
			{/* map over expList */}
			{expList.map((expression, index) => {
				return (
					<div key={index} className={styles.expression}>
						{/* pass expression instance to icon handling component, pass styles too */}
						<ExpressionIcon expression={expression} styles={styles}/>
					</div>
				);
			})}
		</div>
	);
};
export default Expressions;
