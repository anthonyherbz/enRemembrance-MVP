import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";

const Category = () => {
	const router = useRouter();
	const {id} = router.query;
	const [dataResponse, setdataResponse] = useState([]);
	useEffect(() => {
		async function getPageData() {
			const apiUrlEndpoint = "http://localhost:3000/api/getdata-lib";
			const postData = {
				method: "Post",
				headers: {"Content-Type": "application/json"},
				body: JSON.stringify({
					id: id,
				})
			}
			// postData sends info to the API. Using to specify ID of item to request
			const response = await fetch(apiUrlEndpoint, postData);
			const res = await response.json();
			console.log(res);
			setdataResponse(res.categories);
		}
		getPageData();
	}, [router.query.id, router.isReady]);
	//empty [] needed for useEffect otherwise it will infinitely rerender, making infinite calls to server
	//[] contents waits for router 

	return (
		<div>
			<strong>Categories test</strong>
			{dataResponse.map((category) => {
				return <div key={category.id}>{category.name}</div>;
			})}
		</div>
	);
};
export default Category;
