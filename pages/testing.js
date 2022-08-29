import Checkbox from "../components/Checkbox";
import ButtonText from "../components/ButtonText";
import ButtonIcon from "../components/ButtonIcon";
import Author from "../components/Author";
import Logo from "../components/Logo";
import Post from "../components/Post";
import ExpandingText from "../components/ExpandingText";
import PreviewFeed from "../components/PreviewFeed";

const Testing = () => {
	const books = [
		{
			postID: 0,
			title: "post1",
			slug: "/book_example",
			cover: "bookcover.jpg",
			content:
				"Lorem ipsum, dolor sit amet consectetur adipisicing elit. Incidunt facere modi sequi non minus? Provident blanditiis eos sequi excepturi, a libero officia quia, sed culp facilis dolore velit voluptatem voluptate?",
		},
		{
			postID: 1,
			title: "post2",
			slug: "/book_example",
			cover: "bookcover.jpg",
			content:
				"Lorem ipsum, dolor sit amet consectetur adipisicing elit. Incidunt facere modi sequi non minus? Provident blanditiis eos sequi excepturi, a libero officia quia, sed culp facilis dolore velit voluptatem voluptate?",
		},
		{
			postID: 2,
			title: "post3",
			slug: "/book_example",
			cover: "bookcover.jpg",
			content:
				"Lorem ipsum, dolor sit amet consectetur adipisicing elit. Incidunt facere modi sequi non minus? Provident blanditiis eos sequi excepturi, a libero officia quia, sed culp facilis dolore velit voluptatem voluptate?",
		},
		{
			postID: 3,
			title: "post4",
			slug: "/book_example",
			cover: "bookcover.jpg",
			content:
				"Lorem ipsum, dolor sit amet consectetur adipisicing elit. Incidunt facere modi sequi non minus? Provident blanditiis eos sequi excepturi, a libero officia quia, sed culp facilis dolore velit voluptatem voluptate?",
		},
	];
	return (
		<div>
			<ExpandingText backgroundColor='green_landing'>
				Lorem, ipsum dolor sit amet consectetur adipisicing elit.
				Delectus nihil pariatur laboriosam modi ullam aliquid nobis,
				officiis quidem, omnis, aut consectetur est dolore expedita?
				Dignissimos cupiditate aliquid commodi exercitationem quisquam!
			</ExpandingText>
			<Logo />
			<Author />
			<ButtonIcon
				label='test button'
				alt='test button'
				path='/welcome'
				icon='logo_temp'
			/>
			{/* <Checkbox/> */}
			<Post />
			<PreviewFeed books={books} />
		</div>
	);
};
export default Testing;
