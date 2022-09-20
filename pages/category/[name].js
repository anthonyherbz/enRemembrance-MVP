import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";

//Dyanmically generate a category page. This is a good candidate for using static paths because they're not likely to change often, but was a good proof of concept for getting dynamic pages working
const Category = () => {
	const router = useRouter();
	const { name } = router.query; //get the category/[name] from the url
	const [dataResponse, setdataResponse] = useState([]);
	useEffect(() => {
		if (!router.isReady) return; //don't run the useEffect contents until the router returns the ID
		async function getPageData() {
			const apiUrlEndpoint = "http://localhost:3000/api/getcategory-lib";
			const postData = {
				method: "Post",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					name: name,
				}),
			};
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
	const category = dataResponse[0];
	// if (!router.isReady) return <div>Loading</div>
	if (category == undefined) return <div>This category does not exist</div>;
	return (
		<div>
			<strong>Category</strong>
			<div>{category.name}</div>
		</div>
	);
};
export default Category;
