import styles from "./dashboardtable.module.scss"
import classNames from "classnames/bind"
let cx = classNames.bind(styles)
import StatusIcons from "./StatusIcons"
import ActionIcons from "./ActionIcons"
import Link from "next/link"

const DBTable = ({ stories, user_id }) => {
	let dashboardTableClasses = cx({
		dashboardTable: true,
	})

	function buildTableRow(story, index) {
		let old = story.daysOld >= 21 ? true : false
		let month = Math.round(story.daysOld / 31)
		// console.log("old", old)
		// console.log("month", month)

		return (
			<tr key={index}>
				<td>
					<StatusIcons story={story} old={old} />
				</td>
				{old && story.published == 0 ? (
					<>
						<td className={styles.old}>
							<Link href={`/stories/${story.id}`}>
								 {story.title} 
							</Link>
						</td>
						<td className={styles.old}>
							{story.daysOld >= 31 ? (
								<>
									{month}
									{month > 1 ? " months " : " month "}old
								</>
							) : (
								<>
									{story.daysOld} {story.daysOld > 1 ? " days " : " day "} old
								</>
							)}
						</td>
					</>
				) : (
					<>
						<td className={styles.new}>
							<Link href={`/stories/${story.id}`}>
								 {story.title} 
							</Link>
						</td>
						<td className={styles.new}>
							{story.daysOld >= 31 ? (
								<>
									{month}
									{month > 1 ? " months " : " month "}old
								</>
							) : (
								<>
									{story.daysOld} {story.daysOld > 1 ? " days " : " day "} old
								</>
							)}
						</td>
					</>
				)}

				<td>
					<ActionIcons old={old} story_id={story.id} user_id={user_id} published={story.published}  />
				</td>
			</tr>
		)
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
				{stories.map((story, index) => {
					return buildTableRow(story, index)
				})}
				<tr className={styles.endcap}>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
				</tr>
			</tbody>
		</table>
	)
}
export default DBTable

// function buildTableRow(book, index) {
// 	book = book.book;
// 	function checkAge(book) {
// 		let bookDate = book.date;
// 		const createdDate = new Date(bookDate);
// 		const today = new Date();
// 		let age = Math.trunc(
// 			(today.getTime() - createdDate.getTime()) / (1000 * 3600 * 24)
// 		);
// 		return age;
// 	}

// 	let age = checkAge(book);
// 	let old = age >= 21 ? true : false;
// 	let month = Math.round(age / 31);

// 	return (
// 		<tr key={index.index}>
// 			<td>
// 				<StatusIcons book={book} old={old} />
// 			</td>
// 			<NoSsr>
// 				{old && !book.published ? (
// 					<>
// 						<td className={styles.old}>{book.title}</td>
// 						<td className={styles.old}>
// 							{age >= 31 ? (
// 								<>
// 									{month}
// 									{month > 1 ? " months " : " month "}old
// 								</>
// 							) : (
// 								<>
// 									{age} {age > 1 ? " days " : " day "} old
// 								</>
// 							)}
// 						</td>
// 					</>
// 				) : (
// 					<>
// 						<td className={styles.new}>{book.title}</td>
// 						<td className={styles.new}>
// 							{age >= 31 ? (
// 								<>
// 									{month}
// 									{month > 1 ? " months " : " month "}old
// 								</>
// 							) : (
// 								<>
// 									{age} {age > 1 ? " days " : " day "} old
// 								</>
// 							)}
// 						</td>
// 					</>
// 				)}
// 			</NoSsr>
// 			<td>
// 				<NoSsr>
// 					<ActionIcons old={old} published={book.published} />
// 				</NoSsr>
// 			</td>
// 		</tr>
// 	);
// }
