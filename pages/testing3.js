// import { query} from '../lib/db'
import {getData} from './api/getposts-lib'
import PostFeedv2 from "../components/post/PostFeedv2"
const Testing3 = (destruct) => {
	const posts = destruct.destruct
	// console.log(posts)
	return <><PostFeedv2 posts={posts}/></>
}
export default Testing3

export async function getServerSideProps() {
		let data = await getData()
		const destruct = data.posts
	return {
		props:{
			destruct
		},
	}
}
