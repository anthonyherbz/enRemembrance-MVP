import {useState, useEffect} from 'react'
import ImageContainer from './ImageContainer';
import { useRouter } from 'next/router';

const StoriesFeed = ({userId}) => {
	const router = useRouter()
	console.log(userId)
	const [dataResponse, setdataResponse] = useState([]);
	useEffect(() => {
		async function getPageData() {
			const apiUrlEndpoint = "http://localhost:3000/api/getstoriesbyuser-lib";
			const postData = {
				method: "Post",
				headers: {"Content-Type": "application/json"},
				body: JSON.stringify({
					id: userId,
				})
			}
			// postData sends info to the API. Using to specify ID of item to request
			const response = await fetch(apiUrlEndpoint, postData);
			const res = await response.json();
			console.log(res);
			setdataResponse(res.stories);
		}
		getPageData();
	}, [router.isReady]);
	console.log("dataresponse", dataResponse)

	if (dataResponse.length == 0) {
		//basic error handling
		return <div>No stories returned on intial render</div>;
	}
	return (
		<div>
			{dataResponse.map((story) => {
				return(
					<div key={story.id}>
						<div style={{width: "50px", height: "50px"}}><ImageContainer src={`/images/covers/placeholder${story.id}.jpg`}/></div>
						<div>
							{story.title}
						</div>
					</div>
				)
			})}
		</div>
	)
}
export default StoriesFeed;