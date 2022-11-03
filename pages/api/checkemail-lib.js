import { checkEmail } from "../../lib/login"

//Checks if a email exists in the database

export default async function getServerSideProps(req, res) {
	// console.log("ugh", req.body)
	const email = req.body.email
	try {
		const data = await checkEmail(email)
		// console.log(data)
		return { props: res.status(200).json({ data }) }
	} catch (error) {
		return { props: res.status(400).json({ message: error.message }) }
	}
}
