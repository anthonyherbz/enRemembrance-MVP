import React, { useState} from "react"
import Header from "../../components/header/Header"
import ButtonText from "../../components/button/ButtonText"
import Container from "../../components/Container"
import styles from "../../page_sass/authorpage.module.scss"
import StoriesFeed from "../../components/StoriesFeed"
import UserComp from "../../components/UserComp"
import { multiQuery } from "../../lib/db"
export async function getServerSideProps({ params }) {
	const id = params.id
	try {
		const query1 =
			"SELECT id, fullname, handle, email, password, phone_number, CONVERT(join_date, char) as join_date, CONVERT(last_login_date, char) as last_login_date, enabled, bio FROM users WHERE id = ?;"
		const query2 =
			"SELECT id AS story_id, title AS story_title FROM stories WHERE author_id = ? ;"

		const querySql = query1 + query2
		const valuesParams = [id, id]
		const data = await multiQuery({ query: querySql, values: valuesParams })
		console.log("d1", data[0])
		return { props: { data } }
	} catch (error) {
		const data = error
		console.log(data)
		return { props: { data } }
	}
}
const User = ({ data }) => {
	const [user, setuser] = useState(data[0][0])
	const [stories, setstories] = useState(data[1])

	if (user == undefined) {
		return <div>This user does not exist</div>
	}
	return (
		<div>
			<div>
				<Header show/>
				<Container marginTop>
					<div className={styles.authorlead}>
						<UserComp user={user} />
						<div onClick={() => history.back()}><ButtonText color='green' expand label='Back' /></div>
					</div>
					<StoriesFeed stories={stories} />
				</Container>
			</div>
		</div>
	)
}
export default User
