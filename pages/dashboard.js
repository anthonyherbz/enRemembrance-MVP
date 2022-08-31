import styles from "../page_sass/dashboard.module.scss";
import classNames from "classnames/bind";
import Header from "../components/Header";
import DashboardTable from "../components/DashboardTable";
import Nav from '../components/Nav';
import ButtonText from '../components/button/ButtonText';
let cx = classNames.bind(styles);

const Dashboard = () => {
	let dashboardClasses = cx({
		dashboard: true,
	});
	const tableItems = [
		{
			status : "deleted",
			title : "my book1"
		},
		{
			status : "deleted",
			title : "my book2"
		},
		{
			status : "deleted",
			title : "my book3"
		},

	]
	return (
		<div className={dashboardClasses}>
			<Header show />
			<div className={styles.center}>
				<div className={styles.buttons}>
					<ButtonText></ButtonText>
					<ButtonText></ButtonText>
				</div>
				<div className={styles.dash}>
				<Nav/>
				<DashboardTable tableItems={tableItems} />
				</div>
			</div>
		</div>
	);
};
export default Dashboard;
