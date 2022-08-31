import styles from "./dashboardtable.module.scss";
import classNames from "classnames/bind";
// import Header from '../../components/Header';
let cx = classNames.bind(styles);

const DashboardTable = ({ tableItems }) => {
	let dashboardTableClasses = cx({
		dashboardTable: true,
	});
	return (
		<div className={dashboardTableClasses}>
			<table>
				<thead>
					<tr>
						<th>Heading1</th>
						<th>Heading1</th>
						<th>Heading1</th>
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
									<td>{tableItem.title}</td>
								</tr>
							);
						} else {
							return (
								<tr key={index} className={styles.trLight}>
									<td>{tableItem.title}</td>
								</tr>
							);
						}
						return;
					})}
					{/* <th>Table Head</th>
				<tr>Table row</tr>*/}
				</tbody>
			</table>
		</div>
	);
};
export default DashboardTable;
