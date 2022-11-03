import styles from "../page_sass/dashboard.module.scss"
import classNames from "classnames/bind"
import Header from "../components/header/Header"
import Nav from "../components/menu/Nav"
import ButtonText from "../components/button/ButtonText"
import DBTable from "../components/dashboard/DBTable"
import MobileNav from "../components/menu/MobileNav"
import React, { useState } from "react"
import Head from "next/head"
import DashEditOverlay from "../components/dashboard/DashEditOverlay"
let cx = classNames.bind(styles)
import { query } from "../lib/db"
import Layout from "../components/utils/Layout"
import getUser from "../lib/getUser"
import { UserContext } from "./_app"
import { useContext, useEffect } from "react"

//https://www.geeksforgeeks.org/how-to-calculate-the-number-of-days-between-two-dates-in-javascript/

//Get all of the stories belonging to a particular user and sort the results by creation date reverse chron
export async function getServerSideProps({ req }) {
	const { userID, handle } = await getUser(req)
	let id = userID
	try {
		const querySql =
			"SELECT id, author_id, title, CONVERT(create_date, char) as create_date, CONVERT(publish_date, char) as publish_date, published, visible, monetized, page_json FROM stories WHERE author_id = ? ORDER BY create_date DESC"
		const valuesParams = [id]
		const data = await query({ query: querySql, values: valuesParams })
		//For each item in data, check and assign a property of daysOld containing the age in days
		for (let i = 0; i < data.length; i++) {
			let createdDate = new Date(data[i].create_date)
			const today = new Date()
			let age = Math.trunc((today.getTime() - createdDate.getTime()) / (1000 * 3600 * 24))
			data[i].daysOld = age
		}
		return { props: { data, userID, handle } }
	} catch (error) {
		const data = error.message
		return { props: { data, userID, handle } }
	}
}

const Dashboard = ({ data, userID, handle }) => {
	const { loggedInUser, setLoggedInUser } = useContext(UserContext)
	console.log(userID)
	useEffect(() => {
		setLoggedInUser({ userID, handle })
	}, [handle, setLoggedInUser, userID])
	const [stories, setstories] = useState(data)
	const [showEdit, setshowEdit] = useState(false)
	let dashboardClasses = cx({
		dashboard: true,
	})

	return (
		<Layout>
			<Head>
				<title>enRemembrance</title>
				<link rel='icon' href='/images/icons/logo_temp_blue.svg' />
				<meta name='description' content='summary of website' />
			</Head>
			<div className={dashboardClasses}>
				<Header show shadow />
				<MobileNav />
				<div className={styles.container}>
					<Nav topSpace='150' />
					<div className={styles.center}>
						<div className={styles.buttons}>
							<ButtonText
								fill='true'
								color='blue'
								size='small'
								label='Create'
								path='editor'
								targetUrl='/editor'
							/>
							{!stories || stories.length == 0 ? null : (
								<div onClick={() => setshowEdit(true)}>
									<ButtonText
										fill='true'
										color='yellow'
										size='small'
										label='Edit'
									/>
								</div>
							)}
						</div>

						{showEdit ? <DashEditOverlay stories={stories} setshowEdit={setshowEdit} /> : null}
						<div className={styles.dash}>
							{!stories || stories.length == 0 ? (
								<div>No stories found</div>
							) : (
								<DBTable stories={stories} user_id={userID} />
							)}
						</div>
					</div>
				</div>
			</div>
		</Layout>
	)
}
export default Dashboard
