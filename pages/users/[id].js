import React, { useState } from "react"
import Header from "../../components/header/Header"
import ButtonText from "../../components/button/ButtonText"
import Container from "../../components/utils/Container"
import styles from "../../page_sass/authorpage.module.scss"
import StoriesFeed from "../../components/story/StoriesFeed"
import UserComp from "../../components/utils/UserComp"
import { multiQuery } from "../../lib/db"
import getUser from "../../lib/getUser"
import { UserContext } from "../_app"
import { useContext, useEffect } from "react"
import Head from "next/head"

export async function getServerSideProps({ params, req }) {
	const { userID, handle } = await getUser(req)
	const id = params.id
	try {
		const query1 =
			"SELECT id, fullname, handle, email, password, phone_number, CONVERT(join_date, char) as join_date, CONVERT(last_login_date, char) as last_login_date, enabled, bio FROM users WHERE id = ?;"
		const query2 =
			"SELECT id AS story_id, title as story_title, CONVERT(create_date, char) AS create_date FROM stories WHERE author_id = ? ;"

		const querySql = query1 + query2
		const valuesParams = [id, id]
		const data = await multiQuery({ query: querySql, values: valuesParams })
		// console.log("d1", data[0])
		return { props: { data, userID, handle } }
	} catch (error) {
		const data = error
		// console.log(data)
		return { props: { data } }
	}
}
const User = ({ data, userID, handle }) => {
	const [user, setuser] = useState(data[0][0])
	const [stories, setstories] = useState(data[1])
	const { loggedInUser, setLoggedInUser } = useContext(UserContext)
	useEffect(() => {
		setLoggedInUser({ userID, handle })
	}, [handle, setLoggedInUser, userID])
	if (user == undefined) {
		return <div>This user does not exist</div>
	}
	return (
		<div>
			<Head>
			<title>enRemembrance</title>
				<link rel='icon' href='/images/icons/logo_temp_blue.svg' />
				<meta name='description' content='summary of website' />
			</Head>
			<Header show />
			<div className={styles.authorMain}>
				<div className={styles.authorlead}>
					<UserComp user={user} />
					<div onClick={() => history.back()}>
						<ButtonText color='green' expand label='Back' />
					</div>
				</div>
				<StoriesFeed stories={stories} />
			</div>
		</div>
	)
}
export default User
