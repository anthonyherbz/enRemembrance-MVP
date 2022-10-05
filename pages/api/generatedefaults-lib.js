import { promises as fs } from "fs"
export default async function handler(req, res) {
	const type = req.body.type
	let userId
	let coverId
	// const coverId = req.body.cover

	if (type == "user") {
		userId = req.body.id
		try {
			const img = await fs.readFile(
				"public/images/placeholders/profile_default.svg"
			)
			await fs.writeFile(`public/images/users/id${userId}.svg`, img)
			res.status(200).json({ message: "default image copied" })
		} catch (error) {
			res.status(400).json({ message: error })
		}
	}
	if (type == "cover") {
		coverId = req.body.id
		try {
			const img = await fs.readFile("/images/placeholders/cover.jpg")
			await fs.writeFile(`/images/stories/id${coverId}/cover.jpg`, img)
			res.status(200).json({ message: "default image copied" })
		} catch (error) {
			res.status(400).json({ message: "copy failed" })
		}
	}
}
