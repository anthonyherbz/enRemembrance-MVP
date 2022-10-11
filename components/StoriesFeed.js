import { useState, useEffect } from "react"
import ImageContainer from "./ImageContainer"
import { useRouter } from "next/router"
import Link from "next/link"

const StoriesFeed = ({ stories }) => {
	if (stories.length == 0) {
		return <div>This user doesn't have any stories visible to you</div>
	}

	return (
		<div>
			{stories.map((story) => {
				return (
					<div key={story.story_id}>
						<Link href={`/stories/${story.story_id}`}>
							<a>
								<div style={{ width: "50px", height: "50px" }}>
									<ImageContainer
										src={`/images/covers/placeholder${story.story_id}.jpg`}
									/>
								</div>
							</a>
						</Link>
						<div>
							<Link href={`/stories/${story.story_id}`}>
								<a>{story.story_title}</a>
							</Link>
						</div>
					</div>
				)
			})}
		</div>
	)
}
export default StoriesFeed

// console.log(userId)
// const [dataResponse, setdataResponse] = useState([]);
// useEffect(() => {
// 	if(userId==undefined) return; //don't run useEffect contents if the userId hasn't yet been passed
// 	async function getPageData() {
// 		const apiUrlEndpoint = "http://localhost:3000/api/getstoriesbyuser-lib";
// 		const postData = {
// 			method: "Post",
// 			headers: {"Content-Type": "application/json"},
// 			body: JSON.stringify({
// 				id: userId,
// 			})
// 		}
// 		// postData sends info to the API. Using to specify ID of item to request
// 		const response = await fetch(apiUrlEndpoint, postData);
// 		const res = await response.json();
// 		console.log(res);
// 		setdataResponse(res.stories);
// 	}
// 	getPageData();
// }, [userId]);
// console.log("dataresponse", dataResponse)

// if (dataResponse.length == 0) {
// 	//basic error handling
// 	return <div>This user has no stories</div>;
// }
