// const posts = [
// 	{
// 		id: 0, //identifier for post
// 		title:"mybook", //title for post
// 		slug:"/mybook", //slug that directs to post-specific page
// 		body: "post content",
// 		date: "2022/1/31",
// 		bookId:0, //identifies the associated book
// 		authorId:0, //identifies the associated author
// 		commentId:0, //identifies the associated top-comment
// 	},
// 	{
// 		id: 1,
// 		title:"mybook2",
// 		slug:"/mybook2",
// 		bookId:1,
// 		authorId:1,
// 		commentId:1,
// 	},
// 	{
// 		id: 2,
// 		title:"mybook3",
// 		slug:"/mybook3",
// 		bookId:"2",
// 		authorId:2,
// 		commentId:2,
// 	}
// ]

import { makeBooks } from "./arrayConstructors";
const posts = [
	{
		postId: 0,
		postTitle: "Post Title",
		postContent:
			"Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos quos nemo illo maiores",
		bookTitle: "title",
		bookCover: "bookcover.jpg",
		bookSlug: "book0",
		author: "author1",
		authorProfile: "profile.jpg",
		comment: "comment text",
		commentAuthor: "commenter1",
	},
	{
		postId: 1,
		postTitle: "Post Title",
		postContent:
			"Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos quos nemo illo maiores",
		bookTitle: "title",
		bookCover: "bookcover.jpg",
		bookSlug: "book1",
		author: "author1",
		authorProfile: "profile.jpg",
		comment: "comment text",
		commentAuthor: "commenter1",
	},
	{
		postId: 2,
		postTitle: "Post Title",
		postContent:
			"Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos quos nemo illo maiores",
		bookTitle: "title",
		bookCover: "bookcover.jpg",
		bookSlug: "book2",
		author: "author1",
		authorProfile: "profile.jpg",
		comment: "comment text",
		commentAuthor: "commenter1",
	},
	{
		postId: 3,
		postTitle: "Post Title",
		postContent:
			"Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos quos nemo illo maiores",
		bookTitle: "title",
		bookCover: "bookcover.jpg",
		bookSlug: "book3",
		author: "author1",
		authorProfile: "profile.jpg",
		comment: "comment text",
		commentAuthor: "commenter1",
	},
	{
		postId: 4,
		postTitle: "Post Title",
		postContent:
			"Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos quos nemo illo maiores",
		bookTitle: "title",
		bookCover: "bookcover.jpg",
		bookSlug: "book4",
		author: "author1",
		authorProfile: "profile.jpg",
		comment: "comment text",
		commentAuthor: "commenter1",
	},
	{
		postId: 5,
		postTitle: "Post Title",
		postContent:
			"Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos quos nemo illo maiores",
		bookTitle: "title",
		bookCover: "bookcover.jpg",
		bookSlug: "book5",
		author: "author1",
		authorProfile: "profile.jpg",
		comment: "comment text",
		commentAuthor: "commenter1",
	},
];
const comments = [
	{
		id: 0, //unique identifier
		content: "comment content", //comment's body
		date: "2022/1/31", //date comment was created
		authorId: 0, //associated author ID (commentor)
		postId: 0, //associated post ID
	},
	{
		id: 1, //unique identifier
		content: "comment content", //comment's body
		date: "2022/1/31", //date comment was created
		authorId: 0, //associated author ID (commentor)
		postId: 0, //associated post ID
	},
	{
		id: 2, //unique identifier
		content: "comment content", //comment's body
		date: "2022/1/31", //date comment was created
		authorId: 0, //associated author ID (commentor)
		postId: 0, //associated post ID
	},
	{
		id: 3, //unique identifier
		content: "comment content", //comment's body
		date: "2022/1/31", //date comment was created
		authorId: 0, //associated author ID (commentor)
		postId: 0, //associated post ID
	},
	{
		id: 4, //unique identifier
		content: "comment content", //comment's body
		date: "2022/1/31", //date comment was created
		authorId: 0, //associated author ID (commentor)
		postId: 0, //associated post ID
	},
	{
		id: 5, //unique identifier
		content: "comment content", //comment's body
		date: "2022/1/31", //date comment was created
		authorId: 0, //associated author ID (commentor)
		postId: 0, //associated post ID
	},
	{
		id: 6, //unique identifier
		content: "comment content", //comment's body
		date: "2022/1/31", //date comment was created
		authorId: 0, //associated author ID (commentor)
		postId: 0, //associated post ID
	},
	{
		id: 7, //unique identifier
		content: "comment content", //comment's body
		date: "2022/1/31", //date comment was created
		authorId: 0, //associated author ID (commentor)
		postId: 0, //associated post ID
	},
	{
		id: 8, //unique identifier
		content: "comment content", //comment's body
		date: "2022/1/31", //date comment was created
		authorId: 0, //associated author ID (commentor)
		postId: 0, //associated post ID
	},
	{
		id: 9, //unique identifier
		content: "comment content", //comment's body
		date: "2022/1/31", //date comment was created
		authorId: 0, //associated author ID (commentor)
		postId: 0, //associated post ID
	},
];
//DB needs an affordance to prevent visible and monetized being true if published isn't true
// const books = [
// 	{
// 		id: 0,
// 		title: "title",
// 		author: "author",
// 		coverName: "placeholder1.jpg",
// 		slug: "slug",
// 		date: "2022, 9, 1",
// 		pages: {
// 			number: 0,
// 			template: {
// 				templateName: "template1, template2, etc",
// 				position0:{
// 					type: "image or text",
// 					content: "src if image, text content if text",
// 				},
// 				position1:{
// 					type: "image or text",
// 					content: "src if image, text content if text",
// 				},

// 				position2:{
// 					type: "image or text",
// 					content: "src if image, text content if text",
// 				},

// 				position3:{
// 					type: "image or text",
// 					content: "src if image, text content if text",
// 				},
// 			},
// 		},
// 		postId: 0,
// 		published: false,
// 		visible: false,
// 		monetized: false,
// 		expressionsListId: 0,
// 		commentsListId: 0,
// 		description: "book description",
// 	},
// 	{
// 		id: 1,
// 		title: "title",
// 		author: "author",
// 		coverName: "placeholder1.jpg",
// 		slug: "slug",
// 		date: "2022, 8, 22",
// 		postId: 0,
// 		published: true,
// 		visible: true,
// 		monetized: false,
// 		expressionsListId: 0,
// 		commentsListId: 0,
// 		description: "book description",
// 	},
// 	{
// 		id: 2,
// 		title: "title",
// 		author: "author",
// 		coverName: "placeholder1.jpg",
// 		slug: "slug",
// 		date: "2022, 8, 16",
// 		postId: 0,
// 		published: false,
// 		visible: false,
// 		monetized: false,
// 		expressionsListId: 0,
// 		commentsListId: 0,
// 		description: "book description",
// 	},
// 	{
// 		id: 3,
// 		title: "title",
// 		author: "author",
// 		coverName: "placeholder1.jpg",
// 		slug: "slug",
// 		date: "2022, 8, 15",
// 		postId: 0,
// 		published: false,
// 		visible: false,
// 		monetized: false,
// 		expressionsListId: 0,
// 		commentsListId: 0,
// 		description: "book description",
// 	},
// 	{
// 		id: 4,
// 		title: "title",
// 		author: "author",
// 		coverName: "placeholder1.jpg",
// 		slug: "slug",
// 		date: "2022, 5, 1",
// 		postId: 0,
// 		published: true,
// 		visible: false,
// 		monetized: true,
// 		expressionsListId: 0,
// 		commentsListId: 0,
// 		description: "book description",
// 	},
// ];

const authors = [
	{
		id: 0,
		author: "Jo Dee",
		slug: "jodee",
		age: 42,
		creationDate: "2022-09-01",
		bio: "Lorem ipsum dolor sit amet consectetur, adipisicing elit.",
		profileImg: "profile.svg",
	},
	{
		id: 1,
		author: "Jo Dee1",
		slug: "jodee1",
		age: 24,
		creationDate: "2022-05-01",
		bio: "Lorem ipsum dolor sit amet consectetur, adipisicing elit.",
		profileImg: "/images/profile.svg",
	},
	{
		id: 2,
		author: "Jo Dee2",
		slug: "jodee2",
		age: 32,
		creationDate: "2022-08-01",
		bio: "Lorem ipsum dolor sit amet consectetur, adipisicing elit.",
		profileImg: "/images/profile.svg",
	},
];
const books = makeBooks()
function getBooks() {
	const data = books;
	return data;
}
export { getBooks };

// const getPosts = () =>{
// 	const data = posts;
// 	return data;
// }; export {getPosts};

function getPosts() {
	const data = posts;
	return data;
}
export { getPosts };

function getComments() {
	const data = comments;
	return data;
}
export { getComments };

function getAuthors() {
	const data = authors;
	return data;
}
export { getAuthors };

function getPost(searchId) {
	let result = getPosts().filter((item) => {
		return item.postId === searchId;
	});
	return (result = result[0]);
}
export { getPost };

function getBook(searchId) {
	let books = getBooks()
	return books[searchId];
	// let result = getBooks().filter((book) => {
	// 	return book.id === searchId;
	// });
	// // console.log(result)
	// return (result = result[0]);
}
export { getBook };

function getComment(searchId) {
	let result = getComments().filter((item) => {
		return item.id === searchId;
	});
	return (result = result[0]);
}
export { getComment };

function getAuthor(searchId) {
	let result = getAuthors().filter((item) => {
		return item.id === searchId;
	});
	return (result = result[0]);
}
export { getAuthor };

// function getPost(searchId) {
// 	return getPosts().filter((item) => {
// 		return item.id === searchId;
// 	});
// }
// export { getPost };
// function getBook(searchId) {
// 	return getBooks().filter((item) => {
// 		return item.id === searchId;
// 	});
// }
// export { getBook };

/* 
const Post = () => {
	theoretically requires four different calls.
	need to retrieve cover from books, profile pic and name from author, general post details from post, comment information from comment
	
	post = getPost();
	author = getAuthor(post.authorId);
	book = getBook(post.bookId);
	comment = getComment(post.commentId);
	return (
		<div>
			bookcover: img src={`images/books/${book.slug}/cover.jpg`}
			title: heading level=2 post.title
			profileIcon: img src={images/authors/${author.slug}/profilePic.jpg}
			authorName: text author.name
			body: text post.body
			commentorName: comment.author
			commentText: comment.content
		</div>
	)
}
export default Post;


 */
