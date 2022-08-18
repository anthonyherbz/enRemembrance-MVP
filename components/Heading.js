//Four levels of heading in decreasing size and weight
//Props: level, marginBottom<-set up as mixin to add spacing below heading, pushIn<-in-dent/out-dent

import classNames from 'classnames/bind';
import styles from "./heading.module.scss";

let cx = classNames.bind(styles) //allows you to use t/f conditionals in variable
export default function Heading({children, level, marginBottom, pushIn}){ //deconstructs here instead of having to say Heading(props) here and const {label} = props later
	//const {label} = props; //make local var called label from props
	
	let headingClasses = cx({
		heading : true,
		[`margin-bottom-${marginBottom}`] : marginBottom,
		pushIn : pushIn,
		heading1 : level==="1",
		heading2 : level==="2",
		heading3 : level==="3",
		heading4 : level==="4"
	})
	
	if (level === "1"){
		return <h1 className = {headingClasses}>{children}</h1>	
	}else if (level === "2"){
		return <h2 className = {headingClasses}>{children}</h2>
	}else if (level === "3"){
		return <h3 className = {headingClasses}>{children}</h3>
	}else if (level ==="4"){
		return <h4 className = {headingClasses}>{children}</h4>
	}
	else {
		return <p> The heading component requires the level prop.</p>
	}

	
	
}