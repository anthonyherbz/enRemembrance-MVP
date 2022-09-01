import styles from "./dashboardtable.module.scss";
import classNames from "classnames/bind";
// import Header from '../../components/Header';
let cx = classNames.bind(styles);
import {getBooks} from '../lib/api/api';


const DashboardTable = ({ tableItems }) => {
	let dashboardTableClasses = cx({
		dashboardTable: true,
	});
	// const statusIcons= [];
	// const books = getBooks();
	// books.map((book, index) =>{
	// 	statusIcons.push(
	// 		{
	// 			published: book.published,
	// 			public: book.public,
	// 			monetized: book.monetized
	// 		}
	// 		)
	// })

	// const statusIcons1 = [
	// 	{
	// 		iname : "home",
	// 		color : {book}
	// 	}
	// ]
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
				{/* </tbody> */}
				{/* </table> */}
				{tableItems.map((tableItem, index) => {
					let even = index % 2 == 0;
					if (even) {
						return (
							<tr key={index} className={styles.trDark}>
								<td>{tableItem.status}</td>
								<td>{tableItem.title}</td>
								<td>{tableItem.age}</td>
								<td>{tableItem.actions}</td>
							</tr>
						);
					} else {
						return (
							<tr key={index} className={styles.trLight}>
								<td>{tableItem.status}</td>
								<td>{tableItem.title}</td>
								<td>{tableItem.age}</td>
								<td>{tableItem.actions}</td>
							</tr>
						);
					}
					return;
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
export default DashboardTable;
