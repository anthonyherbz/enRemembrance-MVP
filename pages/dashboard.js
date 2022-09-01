import styles from "../page_sass/dashboard.module.scss";
import classNames from "classnames/bind";
import Header from "../components/Header";
import DashboardTable from "../components/DashboardTable";
import Nav from "../components/Nav";
import Icon from "../components/icons/Icon";
import ButtonText from "../components/button/ButtonText";
import DBTable from '../components/DBTable';
let cx = classNames.bind(styles);

const Dashboard = () => {
	let dashboardClasses = cx({
		dashboard: true,
	});
	const tableItems = [
		{
			title: "my book1",
			status: (
				<div>
					<Icon name='home' />
					<Icon name='info' />
					<Icon name='mail' />
				</div>
			),
			age: "yesterday",
			actions: (
				<div>
					<Icon name='home' />
					<Icon name='info' />
					<Icon name='mail' />
					<Icon name='mail' />
				</div>
			),
		},
		{
			title: "my book2",
			status: (
				<div>
					<Icon name='home' />
					<Icon name='info' />
					<Icon name='mail' />
				</div>
			),
			age: "yesterday",
			actions: (
				<div>
					<Icon name='home' />
					<Icon name='info' />
					<Icon name='mail' />
					<Icon name='mail' />
				</div>
			),
		},
		{
			title: "my book3",
			status: (
				<div>
					<Icon name='home' />
					<Icon name='info' />
					<Icon name='mail' />
				</div>
			),
			age: "yesterday",
			actions: (
				<div>
					<Icon name='home' />
					<Icon name='info' />
					<Icon name='mail' />
					<Icon name='mail' />
				</div>
			),
		},
		{
			title: "my book1",
			status: (
				<div>
					<Icon name='home' />
					<Icon name='info' />
					<Icon name='mail' />
				</div>
			),
			age: "yesterday",
			actions: (
				<div>
					<Icon name='home' />
					<Icon name='info' />
					<Icon name='mail' />
					<Icon name='mail' />
				</div>
			),
		},
		{
			title: "my book2",
			status: (
				<div>
					<Icon name='home' />
					<Icon name='info' />
					<Icon name='mail' />
				</div>
			),
			age: "yesterday",
			actions: (
				<div>
					<Icon name='home' />
					<Icon name='info' />
					<Icon name='mail' />
					<Icon name='mail' />
				</div>
			),
		},
		{
			title: "my book3",
			status: (
				<div>
					<Icon name='home' />
					<Icon name='info' />
					<Icon name='mail' />
				</div>
			),
			age: "yesterday",
			actions: (
				<div>
					<Icon name='home' />
					<Icon name='info' />
					<Icon name='mail' />
					<Icon name='mail' />
				</div>
			),
		},
		{
			title: "my book3",
			status: (
				<div>
					<Icon name='home' />
					<Icon name='info' />
					<Icon name='mail' />
				</div>
			),
			age: "yesterday",
			actions: (
				<div>
					<Icon name='home' />
					<Icon name='info' />
					<Icon name='mail' />
					<Icon name='mail' />
				</div>
			),
		},
		{
			title: "my book3",
			status: (
				<div>
					<Icon name='home' />
					<Icon name='info' />
					<Icon name='mail' />
				</div>
			),
			age: "yesterday",
			actions: (
				<div>
					<Icon name='home' />
					<Icon name='info' />
					<Icon name='mail' />
					<Icon name='mail' />
				</div>
			),
		},
		{
			title: "my book3",
			status: (
				<div>
					<Icon name='home' />
					<Icon name='info' />
					<Icon name='mail' />
				</div>
			),
			age: "yesterday",
			actions: (
				<div>
					<Icon name='home' />
					<Icon name='info' />
					<Icon name='mail' />
					<Icon name='mail' />
				</div>
			),
		},
		{
			title: "my book3",
			status: (
				<div>
					<Icon name='home' />
					<Icon name='info' />
					<Icon name='mail' />
				</div>
			),
			age: "yesterday",
			actions: (
				<div>
					<Icon name='home' />
					<Icon name='info' />
					<Icon name='mail' />
					<Icon name='mail' />
				</div>
			),
		},
		{
			title: "my book3",
			status: (
				<div>
					<Icon name='home' />
					<Icon name='info' />
					<Icon name='mail' />
				</div>
			),
			age: "yesterday",
			actions: (
				<div>
					<Icon name='home' />
					<Icon name='info' />
					<Icon name='mail' />
					<Icon name='mail' />
				</div>
			),
		},
		{
			title: "my book3",
			status: (
				<div>
					<Icon name='home' />
					<Icon name='info' />
					<Icon name='mail' />
				</div>
			),
			age: "yesterday",
			actions: (
				<div>
					<Icon name='home' />
					<Icon name='info' />
					<Icon name='mail' />
					<Icon name='mail' />
				</div>
			),
		},
		{
			title: "my book3",
			status: (
				<div>
					<Icon name='home' />
					<Icon name='info' />
					<Icon name='mail' />
				</div>
			),
			age: "yesterday",
			actions: (
				<div>
					<Icon name='home' />
					<Icon name='info' />
					<Icon name='mail' />
					<Icon name='mail' />
				</div>
			),
		},
		{
			title: "my book3",
			status: (
				<div>
					<Icon name='home' />
					<Icon name='info' />
					<Icon name='mail' />
				</div>
			),
			age: "yesterday",
			actions: (
				<div>
					<Icon name='home' />
					<Icon name='info' />
					<Icon name='mail' />
					<Icon name='mail' />
				</div>
			),
		},
	];
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
						/>
						<ButtonText
							fill='true'
							color='yellow'
							size='small'
							label='Edit'
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
