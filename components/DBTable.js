import styles from "./dashboardtable.module.scss";
import classNames from "classnames/bind";
import Icon from "./icons/Icon";
// import Header from '../../components/Header';
let cx = classNames.bind(styles);
import { getBooks } from "../lib/api/api";
import StatusIcons from './StatusIcons';
import ActionIcons from './ActionIcons'
// import ActionIcons from './ActionIcons'

const DBTable = ({}) => {
	let dashboardTableClasses = cx({
		dashboardTable: true,
	});
	const books = getBooks();
	function buildTableRow(book, index) {
		// console.log
		// let todayDate = new Date();
		// let age = book.date - todayDate;
		book = book.book;
		let age = 22; //testing only
		
		let old = false;
		if (age > 21) {
			old = true;
		}
		console.log("temporary age, needs to be reset when calculation is finished: ", age)
		console.log("old is: ", old)
		
		return (
			<tr key={index.index}>
				<td>
					<StatusIcons book={book} old={old} />
				</td>
				{old ? (
					<>
						<td className={styles.old}>{book.title}</td>
						<td className={styles.old}>{age}</td>
					</>
				) : (
					<>
						<td className={styles.new}>{book.title}</td>
						<td className={styles.new}>{age}</td>
					</>
				)}
				<td>
					<ActionIcons />
				</td>
			</tr>
		);
	}

	return (
		<table className={dashboardTableClasses}>
			<thead>
				<tr>
					<th>Status</th>
					<th>Stories</th>
					<th>Age</th>
					<th>Actions</th>
				</tr>
			</thead>
			<tbody>
				{books.map((book, index) => {
					return (
						buildTableRow(book={book}, index={index})
						// <tr key={index} className={styles.trDark}>
						// 	<td>{tableItem.status}</td>
						// 	<td>{tableItem.title}</td>
						// 	<td>{tableItem.age}</td>
						// 	<td>{tableItem.actions}</td>
						// </tr>
					);
				})}
				{/* <th>Table Head</th>
			<tr>Table row</tr>*/}
				<tr className={styles.endcap}>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
				</tr>
			</tbody>
		</table>
	);
};
export default DBTable;
