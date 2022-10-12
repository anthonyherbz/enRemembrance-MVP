import { promises as fs } from "fs"


export default async (req, res) => {
	const id = req.body.id
	try {
		const path = `public/images/stories/id${id}/cover.jpg`
		const image = await fs.readFile('public/images/placeholders/cover.jpg')
		console.log(image)
		await fs.writeFile(path, image)
		//store path in DB
		res.status(200).json({ message: "image uploaded!", })
	} catch (error) {
		res.status(500).json({ message: error.message })
		return
	}
}
