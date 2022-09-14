import styles from '../page_sass/authorpage.module.scss'
import Author from '../components/Author'
import { getAuthors, getPosts } from "./api/api";
import PostFeed from "../components/post/PostFeed";
import ButtonText from "../components/button/ButtonText";
import Header from '../components/header/Header';
import Container from '../components/Container';

const AuthorPage = () => {
	function getAuthor(searchId) {
		return getAuthors().filter((item) => {
			return item.id === searchId;
		});
	}
	let [author] = getAuthor(0);
	// console.log(authors);
	console.log(author);
	let posts = getPosts();
	console.log(posts);
	return (
		<div >
			<Header show/>
			<Container marginTop>
				<div className={styles.authorlead}>
					<Author author={author} />
					<ButtonText color='green' expand label='Back' />
				</div>
				<PostFeed posts={posts} />
			</Container>
		</div>
	);
};
export default AuthorPage;
