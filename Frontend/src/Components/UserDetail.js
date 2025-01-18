import React, { useEffect, useState } from 'react';
import axios from 'axios';

const UserDetail = () => {
    const [userInfo, setUserInfo] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('token');

        if (token) {
            axios.get('http://localhost:8000/api/user-info/', {
                headers: {
                    'Authorization': `Token ${token}`
                }
            })
            .then(res => {
                setUserInfo(res.data);  // Store user info in state
            })
            .catch(err => {
                console.error("Error fetching user info: ", err);
            });
        }
    }, []);

    return (
        <div>
            {userInfo ? (
                <div>
                    <h2>UserName: {userInfo.username}</h2>
                    <p>Email: {userInfo.email}</p>
                    <p>Posts:{userInfo.post_count}</p>
                    {/* Add more fields if needed */}
                </div>
            ) : (
                <p>Loading user information...</p>
            )}
        </div>
    );
};

export default UserDetail ;
