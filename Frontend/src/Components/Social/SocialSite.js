import React, { useEffect, useState, useRef } from 'react';
import './SocialSite.css';
import { FaHeart } from "react-icons/fa6";
import { CiHeart } from "react-icons/ci";
import { FaRegHeart } from "react-icons/fa";

const SocialSite = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1); 
    const [hasMore, setHasMore] = useState(true); 
    const observer = useRef(); 

    useEffect(() => {
        fetchPosts();
    }, [page]);

    const fetchPosts = () => {
        setLoading(true);
        const token = localStorage.getItem('token');
        
        fetch(`http://127.0.0.1:8000/api/posts/?page=${page}&limit=6`, {
            method: 'GET',
            headers: {
                'Authorization': `Token ${token}`, 
                'Content-Type': 'application/json',
            },
        })
            .then(response => response.json())
            .then(jsonData => {
                setData(prevData => [...prevData, ...jsonData]); 
                setHasMore(jsonData.length > 0); 
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
                setLoading(false);
            });
    };

    const lastPostElementRef = (node) => {
        if (loading) return;
        if (observer.current) observer.current.disconnect();

        observer.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting && hasMore) {
                setPage(prevPage => prevPage + 1); 
            }
        });

        if (node) observer.current.observe(node);
    };

    return (
        <div className="Imagegallery">
            {data.map((post, index) => {
                if (data.length === index + 1) {
                    return (
                        <div ref={lastPostElementRef} key={post.id} className="gallery-item">
                            <p className='postuser'>{post.username}</p>
                            <img src={post.photo} alt={post.comment} className="postimg"/>
                            
                          <div className='inAline' > 
                            <p className="description">{post.comment}</p>
                            <p className='likes'><FaRegHeart className='heartred'></FaRegHeart> {post.likes}</p>
                            </div>
                        </div>
                    );
                } else {
                    return (
                        <div key={post.id} className="gallery-item">
                            <p className='postuser'>{post.username}</p>
                            <img src={post.photo} alt={post.comment} className="postimg" />
                            
                            <div className='inAline' >
                            <p className="description">{post.comment}</p>
                            <p className='likes'>< FaHeart className='heartred'></FaHeart> {post.likes}</p>
                            </div>
                        </div>
                    );
                }
            })}
            {loading && <div>Loading more posts...</div>}
            {!hasMore && <div>No more posts to load.</div>}
        </div>
    );
};

export default SocialSite;
