
import PostFeed from "../components/feed/PostFeed"

const Testing = () => {
	const posts = [
		{
			postId: 0,
			postTitle: "Post Title",
			postContent: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos quos nemo illo maiores",
			bookTitle: "title",
			bookCover: "bookcover.jpg",
			bookSlug: "book1",
			author: "author1",
			authorProfile: "profile.jpg",
			comment: "comment text",
			commentAuthor: "commenter1"
		},
		{
			postId: 1,
			postTitle: "Post Title",
			postContent: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos quos nemo illo maiores",
			bookTitle: "title",
			bookCover: "bookcover.jpg",
			bookSlug: "book1",
			author: "author1",
			authorProfile: "profile.jpg",
			comment: "comment text",
			commentAuthor: "commenter1"
		},
		{
			postId: 2,
			postTitle: "Post Title",
			postContent: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos quos nemo illo maiores",
			bookTitle: "title",
			bookCover: "bookcover.jpg",
			bookSlug: "book1",
			author: "author1",
			authorProfile: "profile.jpg",
			comment: "comment text",
			commentAuthor: "commenter1"
		}
	]
	const authors = [
		{
			slug: "/author_example",
			name: "author1",
			profile: "profile.jpg",
			id: 0,
			booksToAuthorsId: 0,
			postsToAuthorsId: 0,
		},
		{
			slug: "/author_example2",
			name: "author2",
			profile: "profile.jpg",
			id: 1,
			booksToAuthorsId: 1,
			postsToAuthorsId: 1,
		},
		{
			slug: "/author_example",
			name: "author3",
			profile: "profile.jpg",
			id: 2,
			booksToAuthorsId: 2,
			postsToAuthorsId: 2,
		},
	];
	//Placeholder book array
	const books = [
		{
			title: "book",
			slug: "/book_example",
			cover: "bookcover.jpg",
			id: 0,
			authorId: 0
		},
	];
	//Placeholder comment array
	const comment = [
		{
			content: "brief comment text of top comment",
			author: "commentor name",
			id: 0
		},
	];

	const postContent =
		"Lorem ipsum, dolor sit amet consectetur adipisicing elit. Incidunt facere modi sequi non minus? Provident blanditiis eos sequi excepturi, a libero officia quia, sed culp facilis dolore velit voluptatem voluptate?";
	return (
		<div>
			<PostFeed posts={posts}/>
		</div>
	);
};
export default Testing;
