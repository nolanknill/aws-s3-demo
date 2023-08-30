import { useState } from 'react';
import './ImageUpload.scss';
import axios from "axios";

const SERVER_URL = process.env.REACT_APP_SERVER_URL;

const ImageUpload = ( { onUpload } ) => {
  // When we are uploading an image, we want to disable the upload button
  const [isUploading, setIsUploading] = useState(false);

  // Upload form submit handler
  const handleUpload = async (e) => {
    // Stops page from refreshing
    e.preventDefault();

    // Grab two form inputs (name of file, and file type)
    const form = e.target;
    const imgTitle = form.imgTitle.value;
    const imgFile = form.imgFile.files[0];

    // Disable the upload button
    setIsUploading(true);

    let signedUrlResponse;
    try {
      signedUrlResponse = await axios.post(`${SERVER_URL}/s3/signed-url`, {
        fileName: imgFile.name,
        fileType: imgFile.type
      })
    } catch (error) {
      setIsUploading(false);
      
      return;
    }
  
    const uniqueFileName = signedUrlResponse.data.fileName;

    try {
      await axios.put(signedUrlResponse.data.url, imgFile, {
        headers: {
          'Content-Type': imgFile.type
        }
      })
    } catch (error) {
      console.log(error);
    }

    try {
      const createGalleryItemResponse = await axios.post(`${SERVER_URL}/gallery/item`, {
        title: imgTitle,
        fileName: uniqueFileName
      });
    
    } catch (error) {
      console.log(error);
    }
    
    form.reset();
    
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