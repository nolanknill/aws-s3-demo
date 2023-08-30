import React, { useState } from 'react';
import ImageUpload from './components/ImageUpload/ImageUpload';
import Gallery from './components/Gallery/Gallery';
import './App.scss';

const App = () => {
  // Gallery items array
  const [galleryItems] = useState([]);

  return (
    <>
      <h1 className="title">AWS S3 Image Gallery</h1>
      <main className="app">
        <ImageUpload/>
        <Gallery items={galleryItems}/>
      </main>
    </>
  );
}

export default App;
