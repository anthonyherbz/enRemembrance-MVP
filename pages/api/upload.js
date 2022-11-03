import { IncomingForm } from 'formidable';
import { promises as fs } from 'fs';
import {ensureDir} from 'fs-extra'
//https://github.com/vercel/next.js/discussions/11634#discussioncomment-1865018
// first we need to disable the default body parser
export const config = {
	api: {
		 bodyParser: false,
	}
};

const upload = async (req, res) => {
	if (req.method === 'POST') {

		 // parse form with a Promise wrapper
		 const data = await new Promise((resolve, reject) => {
			  const form = new IncomingForm();
			  form.parse(req, (err, fields, files) => {
					if (err) return reject(err);
					resolve({ fields, files });
			  });

		 });

		 try {

			  const imageFile = data.files.image;
			  const imagePath = imageFile.filepath;
			  const imageName = data.fields.fileName;
			  let fileType;
			  if (imageFile.mimetype.split("/")[1]== "jpeg"){
				 fileType = "jpg"
			  } else{
				 fileType = imageFile.mimetype.split("/")[1]
			  }
			  const pathToWriteImage = `public/${imageName}.${fileType}`; // include name and .extention, you can get the name from data.files.image object
			//   ensureDir('public/testfolder1')
			  const image = await fs.readFile(imagePath);
			  await fs.writeFile(pathToWriteImage, image);
			//   console.log("trying to write")
			  //store path in DB
			  res.status(200).json({ message: 'image uploaded!', data: data});
		 } catch (error) {
			  res.status(500).json({ message: error.message});
			  return;
		 }
	};
}; export default upload