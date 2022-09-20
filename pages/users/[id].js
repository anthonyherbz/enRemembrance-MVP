import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Header from "../../components/header/Header";
import ButtonText from "../../components/button/ButtonText";
import Container from "../../components/Container";
import styles from '../../page_sass/authorpage.module.scss'
import User from "../../components/User";
import StoriesFeed from "../../components/StoriesFeed";
// import NoSsr from '../../components/NoSsr'

const user = () => {
	const [isLoaded, setisLoaded] = useState(0);
	const router = useRouter();
	const { id } = router.query;
	// console.log("id", id)
	const [dataResponse, setdataResponse] = useState([]);
	useEffect(() => {
		if(!router.isReady) return; //don't run the useEffect contents until the router returns the ID
		setisLoaded(isLoaded=1)
		console.log("isLoaded", isLoaded)
		console.log("useeffect ran")
		async function getPageData() {
			const apiUrlEndpoint = "http://localhost:3000/api/getuser-lib";
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
			setdataResponse(res.user[0]);
		}
		getPageData();
	}, [router.query.id, router.isReady]);
	//empty [] needed for useEffect otherwise it will infinitely rerender, making infinite calls to server
	//[] contents waits for router 

	// if (isLoaded == 0){
	// 	return <div>Loading Page</div>
	// }
	return (
		<div>
			<div >
			{/* <Header show/> */}
			<Container marginTop>
				<div className={styles.authorlead}>
					<User user={dataResponse} />
					<ButtonText color='green' expand label='Back' />
				</div>
				{isLoaded ? <StoriesFeed userId={dataResponse.id}/> : null}
			</Container>
		</div>
		</div>
	);
};
export default user;
