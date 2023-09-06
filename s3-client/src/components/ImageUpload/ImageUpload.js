import { useState } from 'react';
import './ImageUpload.scss';
import axios from "axios";

const API_URL = process.env.REACT_APP_GALLERY_SERVER_URL;

const ImageUpload = ( { onUpload } ) => {
  // When we are uploading an image, we want to disable the upload button
  const [isUploading, setIsUploading] = useState(false);

  // Upload form submit handler
  const handleUpload = async (e) => {
    // Stops page from refreshing
    e.preventDefault();
    
    // Disable the upload button
    setIsUploading(true);

    const title = e.target.imgTitle.value;
    const file = e.target.imgFile.files[0];

    let response;
    try {
      response = await axios.post(`${API_URL}/s3/signed-url`, {
        fileName: file.name,
        fileType: file.type
      })
    } catch (error) {
      alert("Unable to generate Signed URL. Check console for error");
      console.log(error);
    }
    

    const signedUrl = response.data.url;
    const uniqueFileName = response.data.fileName;

    let s3PutResponse;
    try {
      s3PutResponse = await axios.put(signedUrl, file, {
        headers: {
          'Content-Type': file.type
        }
      });

      console.log(s3PutResponse);
    } catch (error) {
      alert("Unable to PUT to S3. Check console for error");
      console.log(error);
    }

    try {
      await axios.post(`${API_URL}/gallery/item`, {
        title: title,
        fileName: uniqueFileName
      })
    } catch (error) {
      alert("Unable to create item on server. Check console for error");
      console.log(error);
    }

    e.target.reset();

    setIsUploading(false);

    onUpload();
  }

  return (
    <form onSubmit={handleUpload} className="image-upload">
      <h2 className="image-upload__title">Upload your image</h2>
      <div className="image-upload__field">
        <label className="image-upload__label" htmlFor="imgTitle">Image Title</label>
        <input className="image-upload__input" type="text" name="imgTitle" id="imgTitle" placeholder="Image Title" required/>
      </div>
      <div className="image-upload__field">
        <label className="image-upload__label" htmlFor="imgFile">Image File</label>
        <input className="image-upload__input" type="file" name="imgFile" id="imgFile" required accept="image/*"/>
      </div>
      <button className="image-upload__submit" type="submit" disabled={isUploading}> Upload to Gallery</button>
    </form>
  )
}

export default ImageUpload;