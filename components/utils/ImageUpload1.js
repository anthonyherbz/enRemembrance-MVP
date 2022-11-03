import { useState } from 'react';

//https://github.com/vercel/next.js/discussions/11634%23discussioncomment-1865018#discussioncomment-1865018

const ImageUpload1 = ({fileNamePath = "default", hasChanged, setHasChanged}) => {
    // console.log("running image upload")
    const [pictureFile, setpictureFile] = useState();
    const fileObject = fileNamePath
    const pictureChangeHandler = async (event) => {
        let file = event.target.files[0]
        // console.log("source: local", file)
        setpictureFile(pictureFile = file)
        await uploadPictureHandler()

    };

    const uploadPictureHandler = async () => {
        const pictureData = new FormData();
        pictureData.append('image', pictureFile);
        pictureData.append('fileName', fileObject)
        try {
            const response = await fetch('/api/upload', {
                method: 'POST',
                body: pictureData
            });
            const data = await response.json();
            if (!response.ok) {
                throw data;
            }
            setpictureFile(null);
        } catch (error) {
            console.log(error.message);
        }
    };

    return (
        <div>
            <input type="file" accept="image/jpeg, image/jpg" name='picture' id="file" onChange={pictureChangeHandler} />
        </div>
    );
};
export default ImageUpload1;