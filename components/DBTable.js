import styles from "./dashboardtable.module.scss";
import classNames from "classnames/bind";
let cx = classNames.bind(styles);
import { getBooks } from "../pages/api/api"
import StatusIcons from "./StatusIcons";
import ActionIcons from "./ActionIcons";
import NoSsr from "./NoSsr";

const DBTable = ({}) => {
	let dashboardTableClasses = cx({
		dashboardTable: true,
	});

	const books = getBooks();
	function buildTableRow(book, index) {
		book = book.book;
		function checkAge(book) {
			let bookDate = book.date;
			const createdDate = new Date(bookDate);
			const today = new Date();
			let age = Math.trunc(
				(today.getTime() - createdDate.getTime()) / (1000 * 3600 * 24)
			);
			return age;
		}

		let age = checkAge(book);
		let old = age >= 21 ? true : false;
		let month = Math.round(age / 31);

		return (
			<tr key={index.index}>
				<td>
					<StatusIcons book={book} old={old} />
				</td>
				<NoSsr>
					{old && !book.published ? (
						<>
							<td className={styles.old}>{book.title}</td>
							<td className={styles.old}>
								{age >= 31 ? (
									<>
										{month}
										{month > 1 ? " months " : " month "}old
									</>
								) : (
									<>
										{age} {age > 1 ? " days " : " day "} old
									</>
								)}
							</td>
						</>
					) : (
						<>
							<td className={styles.new}>{book.title}</td>
							<td className={styles.new}>
								{age >= 31 ? (
									<>
										{month}
										{month > 1 ? " months " : " month "}old
									</>
								) : (
									<>
										{age} {age > 1 ? " days " : " day "} old
									</>
								)}
							</td>
						</>
					)}
				</NoSsr>
				<td>
					<NoSsr>
						<ActionIcons old={old} published={book.published} />
					</NoSsr>
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
					return buildTableRow(
						(book = { book }),
						(index = { index })
					);
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
export default DBTable;
