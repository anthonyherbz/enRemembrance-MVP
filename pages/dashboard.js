import styles from "../page_sass/dashboard.module.scss"
import classNames from "classnames/bind"
import Header from "../components/header/Header"
import Nav from "../components/Nav"
import ButtonText from "../components/button/ButtonText"
import DBTable from "../components/dashboard/DBTable"
import MobileNav from "../components/MobileNav"
import React, { useState } from "react"
import Heading from "../components/Heading"
import Link from "next/link"
let cx = classNames.bind(styles)
import { query } from "../lib/db"

//https://www.geeksforgeeks.org/how-to-calculate-the-number-of-days-between-two-dates-in-javascript/

export async function getServerSideProps({}) {
	const logged_in_user_id = 1
	let id = logged_in_user_id
	try {
		const querySql =
			"SELECT id, author_id, title, CONVERT(create_date, char) as create_date, CONVERT(publish_date, char) as publish_date, published, visible, monetized, page_json FROM stories WHERE author_id = ? ORDER BY create_date DESC"
		const valuesParams = [id]
		const data = await query({ query: querySql, values: valuesParams })
		for (let i = 0; i < data.length; i++) {
			let createdDate = new Date(data[i].create_date)
			const today = new Date()
			// console.log(createdDate)
			let age = Math.trunc((today.getTime() - createdDate.getTime()) / (1000 * 3600 * 24))
			data[i].daysOld = age
		}
		console.log(data)

		return { props: { data } }
	} catch (error) {
		const data = error
		console.log(data)
		return { props: { data } }
	}
}

const Dashboard = ({ data }) => {
	const logged_in_user_id = 1
	const [stories, setstories] = useState(data)
	const [showEdit, setshowEdit] = useState(false)
	let dashboardClasses = cx({
		dashboard: true,
	})
	if (stories == undefined) return <div>Error with stories data</div>
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
							<ButtonText fill='true' color='yellow' size='small' label='Edit' />
						</div>
					</div>

					{showEdit ? (
						<div className={styles.overlay}>
							<div
								className={styles.overlayBG}
								onClick={() => setshowEdit(false)}></div>
							<div className={styles.overlayCenter}>
								<div className={styles.overlayTitle}>
									<Heading level='2'>Select a story to open the editor</Heading>
								</div>
								<div className={styles.overlayScroll}>
									<ul>
										{stories.map((story, index) => {
											return (
												<li key={index}>
													<Link href={`/editor`}>
														<a>{story.title}</a>
													</Link>
												</li>
											)
										})}
									</ul>
								</div>
							</div>
						</div>
					) : null}
					<div className={styles.dash}>
						<DBTable stories={stories} user_id={logged_in_user_id} />
					</div>
				</div>
			</div>
		</div>
	)
}
export default Dashboard
