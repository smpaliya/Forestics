import React, { useEffect,useState } from 'react';
import './AddPost.css';

export default function AddPost() {
 
  const [username, setUsername] = useState('');  
  const [image, setImage] = useState('');
  const [imagePreview, setImagePreview] = useState('');
  const [comment, setComment] = useState('');
  const token = localStorage.getItem('token');
  // Handle file input change (for uploading image)
  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
    const selectedImage = e.target.files[0];
    if (selectedImage) {
      const imageUrl = URL.createObjectURL(selectedImage); // Create a URL for the selected image
      setImagePreview(imageUrl); // Set the image preview URL
    }
  };
  
  // Handle comment change
  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };
  useEffect(() => {
    console.log("Taking username from local storage")
    // Retrieve the username from localStorage or fetch from API
    const storedUsername = localStorage.getItem('username');
    if (storedUsername) {
      setUsername(String(storedUsername));  // Ensure username is a string
    } else {
      console.error('No username found in localStorage');
    }
  }, []);
  console.log("username",username);
  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!username || !image) {
      alert("Username and image are required");
      return;
    }
    // Create a FormData object to send the image and comment
    const formData = new FormData();
    formData.append('username',username)
    formData.append('photo', image);
    formData.append('comment', comment);
    formData.append('likes', '0');  // You can set default values for likes if needed

    try {
      const response = await fetch('http://127.0.0.1:8000/api/posts/', {
        method: 'POST',
        body: formData,
        headers: {
          'Authorization': `Token ${token}`,  
        },
      });

      if (response.ok) {
        alert('Post added successfully!');
      } else {
        alert('Failed to add post');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="AddPostPage">
      <form onSubmit={handleSubmit} className='ImguploadForm'>
        <label className="uploadLabel">Upload Picture</label>
        <div className="uploadPicture">
          <input type="file" className='fileinput' accept="image/*" onChange={handleImageChange} />
        </div>

        <br></br>
        {imagePreview && (
          <div className="imagePreviewContainer">
            <img src={imagePreview} alt="Preview" className="imagePreview" />
          </div>
        )}

        <label className='commlabel'>Comment</label>
        <br></br>
        <textarea value={comment} onChange={handleCommentChange} className='Comment'/>

        <button type="submit">Done</button>
      </form>
    </div>
  );
}
