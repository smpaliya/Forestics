import React, { useState, useEffect, useRef } from "react";

const PhotoViewer = () => {
  const [photos, setPhotos] = useState([]);
  const viewerRef = useRef(null);

  // Function to simulate loading photos dynamically
  const loadPhotos = () => {
    const newPhotos = [];
    for (let i = 0; i < 10; i++) { // Load 10 photos at a time
      newPhotos.push(`https://via.placeholder.com/150?text=Photo+${photos.length + i + 1}`);
    }
    setPhotos((prevPhotos) => [...prevPhotos, ...newPhotos]);
  };

  // Effect to load initial photos
  useEffect(() => {
    loadPhotos();
  }, []);

  // Effect to add scroll event listener
  useEffect(() => {
    const handleScroll = () => {
      if (viewerRef.current.scrollTop + viewerRef.current.clientHeight >= viewerRef.current.scrollHeight - 100) {
        loadPhotos(); // Load more photos when scrolled near the bottom
      }
    };

    const viewer = viewerRef.current;
    viewer.addEventListener("scroll", handleScroll);

    return () => viewer.removeEventListener("scroll", handleScroll);
  }, [photos]);

  return (
    <div ref={viewerRef} className="photo-viewer">
      {photos.map((photo, index) => (
        <img key={index} src={photo} alt={`Photo ${index + 1}`} className="photo" />
      ))}
    </div>
  );
};

export default PhotoViewer;
