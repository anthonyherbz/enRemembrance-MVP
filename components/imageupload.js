import { useState } from 'react';

const ImageUpload = ({fileNamePath = "default"}) => {
    const [pictureFile, setpictureFile] = useState();
    const fileObject = fileNamePath
    const pictureChangeHandler = (event) => {
        let file = event.target.files[0]
        console.log("source: local", file)
        setpictureFile(pictureFile = file)

    };

    const uploadPictureHandler = async () => {
        console.log("picturefile", pictureFile)
        const pictureData = new FormData();
        pictureData.append('image', pictureFile);
        pictureData.append('fileName', fileObject)
        try {
            const response = await fetch('/api/upload', {
                method: 'POST',
                body: pictureData
            });
           
            const data = await response.json();
            console.log("data", data)
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
            <input accept="image" type="file" name='picture' id="file" onChange={pictureChangeHandler} />
            <button onClick={uploadPictureHandler}>
                go
            </button>
        </div>
    );
};
export default ImageUpload;