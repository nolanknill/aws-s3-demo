import React, { useEffect, useState } from 'react';
import ImageUpload from './components/ImageUpload/ImageUpload';
import Gallery from './components/Gallery/Gallery';
import './App.scss';
import axios from 'axios';

const API_URL = process.env.REACT_APP_GALLERY_SERVER_URL;

const App = () => {
  // Gallery items array
  const [galleryItems, setGalleryItems] = useState([]);

  useEffect(() => {
    fetchGallery();
  })
  const fetchGallery = async () => {
    const response = await axios.get(`${API_URL}/gallery`);

    setGalleryItems(response.data);
  }

  return (
    <>
      <h1 className="title">AWS S3 Image Gallery</h1>
      <main className="app">
        <ImageUpload onUpload={fetchGallery} />
        <Gallery items={galleryItems}/>
      </main>
    </>
  );
}

export default App;
