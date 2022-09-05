import {getBooks} from '../lib/api/api'
import PostFeed from "../components/feed/PostFeed"
import DBTable from '../components/DBTable';

const Testing = () => {
	const books = getBooks()
	const myBook = books[0]
	// console.log(books)

	let book = myBook;
		function checkAge(book) {
			let bookDate = book.date
			// console.log(bookDate);
			// return;
			// const tempCreated = new Date("2022, 9, 1");
			const createdDate = new Date(bookDate)
			const today = new Date();
			let age =
				(today.getTime() - createdDate.getTime()) / (1000 * 3600 * 24);
			// console.log(difference);
			return age;
		}
		let age = checkAge(book)
		console.log(age)
		let old = age > 21 ? true : false;
		console.log(old)

	// console.log(time())
	return (
		<div>
			{/* {checkAge(book)} */}
			{/* <PostFeed posts={posts}/> */}
		</div>
	);
};
export default Testing;
