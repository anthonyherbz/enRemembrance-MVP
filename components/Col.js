//Puts items into a vertical list (a column)
//Needs to grow or shrink number of columns depending on screen width
//Reqs: Row(?)

import styles from "./col.module.scss"
import classNames from "classnames/bind"

let cx = classNames.bind(styles);

const Col = () => {
	let colClasses = cx({
		col: true
	});
	return <div className={colClasses}>{children}</div>
}