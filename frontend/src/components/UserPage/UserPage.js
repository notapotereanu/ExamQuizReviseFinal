import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import LoggedUser from './LoggedUser';
import ViewingOtherUser from './ViewingOtherUser';

const UserPage = () => {
  const { userId } = useParams();
  const currentUser = localStorage.getItem('user_id');
  const [userData, setUserData] = useState(null);

  const fetchUserData = async () => {
    const apiUrl = userId === currentUser ? `http://127.0.0.1:5000/api/user/profile` : `http://127.0.0.1:5000/api/user/public-profile/${userId}`;
    console.log(apiUrl)
    const accessToken = localStorage.getItem('access_token');
    try {
      const response = await fetch(apiUrl, {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
        },
      });
  
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
      const data = await response.json();
      setUserData(data);
      console.log(data);
    } catch (error) {
      console.error("Failed to fetch user data:", error);
    }
  };
  

  if (!userData) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {userId === currentUser ? (
        <LoggedUser userData={userData} />
      ) : (
        <ViewingOtherUser userData={userData} />
      )}
    </div>
  );
};

export default UserPage;