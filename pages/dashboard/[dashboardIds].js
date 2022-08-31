import styles from '../page_sass/dashboard.module.scss'
import classNames from "classnames/bind";
import Header from '../../components/Header';
let cx = classNames.bind(styles);

const Dashboard = () => {
	let dashboardClasses = cx({
		dashboard : true,
	})
	return (
		<div className={dashboardClasses}>
			<Header/>
		</div>
	)
}