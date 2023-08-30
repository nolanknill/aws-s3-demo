import React, { useState, useEffect } from 'react';
import ImageUpload from './components/ImageUpload/ImageUpload';
import Gallery from './components/Gallery/Gallery';
import axios from "axios";
import './App.scss';

const SERVER_URL = process.env.REACT_APP_SERVER_URL;

const App = () => {
  // Gallery items array
  const [galleryItems, setGalleryItems] = useState([]);

  useEffect(() => {
    fetchGallery();
  }, []);

  const fetchGallery = async () => {
    const response = await axios.get(`${SERVER_URL}/gallery`);
    console.log(response);
    
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
