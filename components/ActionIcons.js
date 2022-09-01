import styles from './actionicons.module.scss'
import Icon from './icons/Icon';

const ActionIcons = () => {
	let iconNames = ["print", "pdf", "trash", "more"]
	console.log(iconNames)
	return (
		<div>
			<Icon name="print" color="#000"/>
			<Icon name="pdf" color="#000"/>
			<Icon name="trash" color="#000"/>
			<Icon name="more" color="#000"/>
			{/* {iconNames.map((iName, index) => {
				<Icon key={index} name="trash" color="#000" width="50" height="50"/>
				console.log(iName)
			})} */}
		</div>
	)
}
export default ActionIcons;