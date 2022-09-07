import styles from "../page_sass/dashboard.module.scss";
import classNames from "classnames/bind";
import Header from "../components/Header";
import Nav from "../components/Nav";
import ButtonText from "../components/button/ButtonText";
import DBTable from '../components/DBTable';
let cx = classNames.bind(styles);

//https://www.geeksforgeeks.org/how-to-calculate-the-number-of-days-between-two-dates-in-javascript/

const Dashboard = () => {
	let dashboardClasses = cx({
		dashboard: true,
	});

	return (
		<div className={dashboardClasses}>
			<Header show shadow />
			<div className={styles.container}>
				<Nav topSpace="150"/>
				<div className={styles.center}>
					<div className={styles.buttons}>
						<ButtonText
							fill='true'
							color='blue'
							size='small'
							label='Create'
							path="editor"
						/>
						<ButtonText
							fill='true'
							color='yellow'
							size='small'
							label='Edit'
							path="editor"
						/>
					</div>
					<div className={styles.dash}>
						<DBTable/>
					</div>
				</div>
			</div>
		</div>
	);
};
export default Dashboard;
