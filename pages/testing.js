import {getBooks} from '../lib/api/api'
import PostFeed from "../components/feed/PostFeed"
import DBTable from '../components/DBTable';

const Testing = () => {
	// const books = getBooks()
	// console.log(books)
	
	return (
		<div>
			<DBTable/>
			{/* <PostFeed posts={posts}/> */}
		</div>
	);
};
export default Testing;
