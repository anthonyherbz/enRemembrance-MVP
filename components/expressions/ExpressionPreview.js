//Arrays the different expressions horizontally and shows their description on hover
//Reqs: Icon, Row
//Props: icon-color, row-spacing,
import { BsFlower1, BsFlower2, BsFlower3 } from "react-icons/bs";
import {GiSpotedFlower, GiLotusFlower} from 'react-icons/gi'
import { useState } from "react";


import { IconContext } from "react-icons";
import Image from "next/image";
import styles from './expressionspreview.module.scss';
import Expressions from "./Expressions";
const ExpressionPreview = () => {
	let [showExp, setShowExp] = useState(0)
	function handleClick(){
		setShowExp(showExp=1)
	}
	function hideExp(){
		setShowExp(showExp=0)
	}
	return (
		<div onClick={handleClick} onMouseLeave={hideExp}>
			<IconContext.Provider value={{ color: "black", size: "1.5em"}}>
				<div className={styles.expressionPreview}>
					<BsFlower1 />
					<BsFlower2/>
					<BsFlower3/>
					<GiSpotedFlower/>
					<GiLotusFlower/>
				</div>
				<div className={styles.expressionsMobile}><BsFlower1/></div>
			</IconContext.Provider>
			{showExp ? <Expressions setShowExp={setShowExp} showExp={showExp} /> : null}
		</div>
	);
};
export default ExpressionPreview ;
