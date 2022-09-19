import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Header from "../../components/header/Header";
import ButtonText from "../../components/button/ButtonText";
import Container from "../../components/Container";
import styles from '../../page_sass/authorpage.module.scss'
import User from "../../components/User";
import StoriesFeed from "../../components/StoriesFeed";

const users = () => {
	const router = useRouter();
	const {id} = router.query;
	const [dataResponse, setdataResponse] = useState([]);
	useEffect(() => {
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

	return (
		<div>
			<div >
			{/* <Header show/> */}
			<Container marginTop>
				<div className={styles.authorlead}>
					<User user={dataResponse} />
					<ButtonText color='green' expand label='Back' />
				</div>
				<StoriesFeed userId={dataResponse.id}/>
				{/* <PostFeed posts={posts} /> */}
			</Container>
		</div>
		</div>
	);
};
export default users;
