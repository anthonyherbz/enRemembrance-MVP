//Arrays the different expressions horizontally and shows their description on hover
//Reqs: Icon, Row
//Props: icon-color, row-spacing,
import { BsFlower1, BsFlower2, BsFlower3 } from "react-icons/bs";
import {GiSpotedFlower, GiLotusFlower} from 'react-icons/gi'
import { useState } from "react";


import { IconContext } from "react-icons";
import Image from "next/image";
import styles from './expressions.module.scss';
import Expressions from "./Expressions";
const ExpressionPreview = () => {
	let [showExp, setShowExp] = useState(0)
	function handleClick(){
		setShowExp(showExp=1)
	}
	return (
		<div onClick={handleClick}>
			<IconContext.Provider value={{ color: "black", size: "2em"}}>
				<div className={styles.expressionPreview}>
					<BsFlower1 />
					<BsFlower2/>
					<BsFlower3/>
					<GiSpotedFlower/>
					<GiLotusFlower/>
				</div>
			</IconContext.Provider>
			{showExp ? <Expressions setShowExp={setShowExp} showExp={showExp} /> : null}
		</div>
	);
};
export default ExpressionPreview ;
