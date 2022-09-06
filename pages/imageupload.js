import { useState } from 'react';

const ImageUpload = () => {
    const [pictureFile, setpictureFile] = useState();

    const pictureChangeHandler = (event) => {
        let file = event.target.files[0]
        console.log("source: local", file)
        setpictureFile(pictureFile = file)
        // setpictureFile(event.target.files[0]);
        console.log("source: local", pictureFile);
    };

    const uploadPictureHandler = async () => {
        const pictureData = new FormData();
        pictureData.append('image', pictureFile);
        console.log("source: local", pictureData)
        try {
            const response = await fetch('/api/upload', {
                method: 'POST',
                body: pictureData,
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
            <input accept="image/png, image/jpg" type="file" name='picture' onChange={pictureChangeHandler} />
            <button onClick={uploadPictureHandler}>
                go
            </button>
        </div>
    );
};
export default ImageUpload;