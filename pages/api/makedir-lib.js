import {ensureDir} from 'fs-extra'

const makedir = async (req, res) => {
	const path = req.body.dirPath
	try {
		ensureDir(path)
		 res.status(200).json({message: 'success', path: path})
	} catch (error){
		res.status(400).json({message: error})
	}
}; export default makedir