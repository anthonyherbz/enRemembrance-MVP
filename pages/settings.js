import getUser from "../lib/getUser"
import { UserContext } from "./_app"
import { useContext, useEffect } from "react"

export async function getServerSideProps({ req }) {
	const {userID, handle} = await getUser(req)
	return {props: {userID, handle}}
}

const Settings = ({handle, userID}) => {
	const { loggedInUser, setLoggedInUser } = useContext(UserContext)
	useEffect(() => {
		setLoggedInUser({userID, handle})
	}, [])
	return (
		<>

		</>
	)
}
export default Settings;