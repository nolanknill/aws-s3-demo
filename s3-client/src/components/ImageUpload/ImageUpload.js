import { useState } from 'react';
import './ImageUpload.scss';

const ImageUpload = () => {
  // When we are uploading an image, we want to disable the upload button
  const [isUploading, setIsUploading] = useState(false);

  // Upload form submit handler
  const handleUpload = (e) => {
    // Stops page from refreshing
    e.preventDefault();

    // Disable the upload button
    setIsUploading(true);
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