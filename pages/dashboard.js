import styles from "../page_sass/dashboard.module.scss"
import classNames from "classnames/bind"
import Header from "../components/header/Header"
import Nav from "../components/Nav"
import ButtonText from "../components/button/ButtonText"
import DBTable from "../components/dashboard/DBTable"
import MobileNav from "../components/MobileNav"
import Container from "../components/Container"
import React, { useState, useEffect } from "react"
import Heading from '../components/Heading'
import { useRouter } from "next/router"
import Link from "next/link"
let cx = classNames.bind(styles)

//https://www.geeksforgeeks.org/how-to-calculate-the-number-of-days-between-two-dates-in-javascript/

const Dashboard = () => {
	const logged_in_user_id = 1
	const router = useRouter()
	const [stories, setstories] = useState()
	const [showEdit, setshowEdit] = useState(false)

	const [isLoaded, setisLoaded] = useState(false)
	let dashboardClasses = cx({
		dashboard: true,
	})
	useEffect(() => {
		if (!router.isReady) return //don't run the useEffect contents until the router is ready
		setisLoaded(true)
		// console.log("isLoaded", isLoaded)
		// console.log("useeffect ran")
		async function getPageData() {
			const apiUrlEndpoint = "/api/getstoriesbyuser-lib"
			const postData = {
				method: "Post",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					id: logged_in_user_id,
					withAge: true,
				}),
			}
			// postData sends info to the API. Using to specify ID of item to request
			const response = await fetch(apiUrlEndpoint, postData)
			const res = await response.json()
			// console.log(res)
			setstories(res.stories)
		}
		getPageData()
	}, [router.isReady])
	// console.log("stories", stories)
	if (!isLoaded) return <div>Loading</div>
	if (stories == undefined && isLoaded) return <div>Error with stories data</div>

	if (isLoaded) {
		return (
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
							/>
							<div onClick={() => setshowEdit(true)}>
								<ButtonText
									fill='true'
									color='yellow'
									size='small'
									label='Edit'
								/>
							</div>
						</div>
						
						{showEdit ? <div className={styles.overlay}>
							<div className={styles.overlayBG} onClick={() => setshowEdit(false)}></div>
							<div className={styles.overlayCenter}>
							<div className={styles.overlayTitle}><Heading level="2">Select a story to open the editor</Heading></div>
								<div className={styles.overlayScroll}>
									<ul>
										{stories.map((story, index) => {
											return <li>
												<Link href={`/editor`}><a>{story.title}</a></Link>
											</li>
										})}
									</ul>
								</div>
							</div>
						</div> : null}
						<div className={styles.dash}>
							<DBTable stories={stories} user_id={logged_in_user_id} />
						</div>
					</div>
				</div>
			</div>
		)
	}
}
export default Dashboard
