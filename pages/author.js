import Author from '../components/Author'
import {getAuthors, getPosts} from './api/api'
import PostFeed from '../components/feed/PostFeed';
import ButtonText from '../components/button/ButtonText';

const AuthorPage = () => {
	function getAuthor(searchId){
		return getAuthors().filter((item) => {
			return item.id === searchId;
		});
	}
	let [author] = getAuthor(0);
	// console.log(authors);
	console.log(author)
	let posts = getPosts();
	console.log(posts)
	return (
		<>
			<div style={{display: "flex", flexWrap: "nowrap", width: "100%"}}><Author author={author}/><ButtonText color="green" size="large" label="Back"/></div>
			<PostFeed posts={posts}/>
		</>
	)
}
export default AuthorPage;