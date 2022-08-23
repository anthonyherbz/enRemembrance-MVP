//Appears on the welcome page to contain preview posts and display them to visitors
//Needs to be a scrollable list of PreviewPost components. Flexible
//Requires: Col
import Feed from "./components/Feed";
const previewPosts = [
	{
		postID: 1,
		title: "post1"
	},
	{
		postID: 2,
		title: "post2"
	},
	{
		postID: 3,
		title: "post3"
	},
	{
		postID: 4,
		title: "post4"
	},
		
];

const PreviewFeed = () => {
	return (
		<div>
			<Feed/>
		</div>)
}
export default PreviewFeed;