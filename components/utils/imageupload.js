import { useState } from 'react';

//https://github.com/vercel/next.js/discussions/11634%23discussioncomment-1865018#discussioncomment-1865018

const ImageUpload = ({fileNamePath = "default", parentImg, setParentImg, imageType, setimageType}) => {
    console.log("running image upload")
    const [pictureFile, setpictureFile] = useState();
    const fileObject = fileNamePath
    const pictureChangeHandler = (event) => {
        let file = event.target.files[0]
        console.log("source: local", file)
        setpictureFile(pictureFile = file)
        

    };

    const uploadPictureHandler = async () => {
        if (parentImg == undefined){
            setParentImg(pictureFile)
        }
        
        console.log("prntimg", parentImg)
        console.log("picturefile", pictureFile)
        const pictureData = new FormData();
        pictureData.append('image', pictureFile);
        pictureData.append('fileName', fileObject)
        console.log("upload picture handler here")
        try {
            const response = await fetch('/api/upload', {
                method: 'POST',
                body: pictureData
            });
            console.log("res", response)
            const data = await response.json();
            console.log("data", data)
            const type = data.data.files.image.mimetype
            console.log("datatype", type)
            if (type.split("/")[1]== "jpeg"){
                setimageType("jpg")
             } else{
                setimageType(type.split("/")[1])
             }
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
            <button onClick={uploadPictureHandler}>
                go
            </button>
        </div>
    );
};
export default ImageUpload;