import React, { useEffect, useState } from 'react';
import './Social/SocialSite.css'
const SocialPage = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('http://127.0.0.1:8000/api/posts/')
            .then(response => response.json())
            .then(jsonData => {
                setData(jsonData); // Set the fetched data
                setLoading(false); // Set loading to false after data is loaded
            })
            .catch(error => {
                console.error('Error fetching data:', error);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!Array.isArray(data)) {
        return <div>Error: Data is not an array</div>;
    }

    return (
        <div className="gallery">
            {data.map(post => (
                <div key={post.id} className="gallery-item">
                    <img src={post.photo} alt={post.comment} className='postimg'/>
                    <p className='description'>{post.comment}</p>
                    <p className='likes'>Likes: {post.likes}</p>
                </div>
            ))}
        </div>
    );
};

export default SocialPage;
