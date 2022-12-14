import { promises as fs } from "fs"
export default async function getServerSideProps(req, res) {
	const type = req.body.type
	let userId
	let coverId
	if (type == "user") {
		userId = req.body.id
		try {
			const img = await fs.readFile(
				"public/images/placeholders/profile_default.jpg"
			)
			await fs.writeFile(`public/images/users/id${userId}.jpg`, img)
			res.status(200).json({ message: "default image copied" })
		} catch (error) {
			res.status(400).json({ message: error.message })
		}
	}
	if (type == "cover") {
		coverId = req.body.id
		try {
			const img = await fs.readFile("public/images/placeholders/cover.jpg")
			await fs.writeFile(`public/images/stories/id${coverId}/cover.jpg`, img)
			res.status(200).json({ message: "default image copied" })
		} catch (error) {
			res.status(400).json({ message: error.message})
		}
	}
}
