import styles from "./dashboardtable.module.scss";
import classNames from "classnames/bind";
// import Header from '../../components/Header';
let cx = classNames.bind(styles);

const DashboardTable = ({ tableItems }) => {
	let dashboardTableClasses = cx({
		dashboardTable: true,
	});

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
				{tableItems.map((tableItem, index) => {
					<tr key={index}>
						<td>{tableItem.status}</td>
						<td>{tableItem.title}</td>
						<td>{tableItem.age}</td>
						<td>{tableItem.actions}</td>
					</tr>;
					return;
				})}
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
