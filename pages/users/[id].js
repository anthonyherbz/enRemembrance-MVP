import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Header from "../../components/header/Header";
import ButtonText from "../../components/button/ButtonText";
import Container from "../../components/Container";
import styles from '../../page_sass/authorpage.module.scss'
import User from "../../components/UserComp";
import StoriesFeed from "../../components/StoriesFeed";
import UserComp from "../../components/UserComp";
// import NoSsr from '../../components/NoSsr'

const User = () => {
	const [isLoaded, setisLoaded] = useState(0);
	const router = useRouter();
	const { id } = router.query;
	// console.log("id", id)
	const [user, setuser] = useState([]);
	const [stories, setstories] = useState([])
	useEffect(() => {
		if(!router.isReady) return; //don't run the useEffect contents until the router returns the ID
		setisLoaded(isLoaded=1)
		console.log("isLoaded", isLoaded)
		console.log("useeffect ran")
		async function getPageData() {
			const apiUrlEndpoint = "/api/getuser-lib";
			const postData = {
				method: "Post",
				headers: {"Content-Type": "application/json"},
				body: JSON.stringify({
					user_id: id,
				})
			}
			// postData sends info to the API. Using to specify ID of item to request
			const response = await fetch(apiUrlEndpoint, postData);
			const res = await response.json();
			console.log(res);
			setuser(res.user[0])
			setstories(res.stories)
		}
		getPageData();
	}, [router.query.id, router.isReady]);
	//empty [] needed for useEffect otherwise it will infinitely rerender, making infinite calls to server
	//[] contents waits for router 

	if (isLoaded == 0){
		return <div>...</div>
	}
	if (user == undefined){
		return <div>This user does not exist</div>
	}
	return (
		<div>
			<div >
			{/* <Header show/> */}
			<Container marginTop>
				<div className={styles.authorlead}>
					<UserComp user={user} />
					<ButtonText color='green' expand label='Back' />
				</div>
				{isLoaded ? <StoriesFeed stories={stories}/> : null}
			</Container>
		</div>
		</div>
	);
};
export default User;
