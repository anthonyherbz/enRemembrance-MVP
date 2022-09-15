import React, { useState, useEffect } from "react";

const Testing = () => {
	const [dataResponse, setdataResponse] = useState([]);
	useEffect(() => {
		async function getPageData() {
			const apiUrlEndpoint = "http://localhost:3000/api/getdata-lib";
			const response = await fetch(apiUrlEndpoint);
			const res = await response.json();
			console.log(res);
			setdataResponse(res.categories);
		}
		getPageData();
	}, []);
	//empty [] needed for useEffect otherwise it will infinitely rerender, making infinite calls to server

	return (
		<div>
			<strong>Categories test</strong>
			{dataResponse.map((category) => {
				return <div key={category.id}>{category.name}</div>;
			})}
		</div>
	);
};
export default Testing;
