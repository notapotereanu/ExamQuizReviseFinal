import { FaStar } from 'react-icons/fa';
import React, { useEffect, useState } from 'react';

const Leaderboard = ({ }) => {

  const [leaderboardData, setLeaderboardData] = useState([]);

  useEffect(() => {
    fetch('http://127.0.0.1:5000/api/leaderboard')
      .then(response => response.json())
      .then(data => {
        // Sort the data in descending order by question_count
        const sortedData = data.sort((a, b) => b.question_count - a.question_count);

        // Add id and stars fields
        const finalData = sortedData.map((item, index) => ({
          ...item,
          id: index + 1,
          stars: Math.min(item.question_count, 5),
        }));

        setLeaderboardData(finalData);
      })
      .catch(error => console.error('Error:', error));
  }, []);

  return (
    <div style={{ padding: '20px', backgroundColor: '#f9f9f9', borderRadius: '10px' }}>
      <h1 style={{ textAlign: 'center', color: '#333', marginBottom: '20px', fontSize: '2em', fontFamily: 'Roboto, sans-serif' }}>Leaderboard</h1>

      <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: '10px', backgroundColor: '#ddd', borderRadius: '5px', marginBottom: '10px' }}>
        <div style={{ flex: 1, display: 'flex', alignItems: 'center' }}>
          <h3 style={{ color: '#333', fontSize: '20px', fontWeight: 'bold', fontFamily: 'Roboto, sans-serif' }}>Name</h3>
        </div>
        <div style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <h3 style={{ color: '#333', fontSize: '20px', fontWeight: 'bold', fontFamily: 'Roboto, sans-serif' }}>Stars</h3>
        </div>
        <div style={{ flex: 1, display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
          <h3 style={{ color: '#333', fontSize: '20px', fontWeight: 'bold', fontFamily: 'Roboto, sans-serif' }}>Score</h3>
        </div>
      </div>

      {leaderboardData.map((player, index) => (
        <div key={player.id} style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: '5px', backgroundColor: index % 2 === 0 ? '#fff' : '#eee', borderRadius: '5px', marginBottom: '10px' }}>
          <div style={{ flex: 1, display: 'flex', alignItems: 'center' }}>
            <h2 style={{ marginLeft: '10px', marginBottom: '0', fontSize: '20px', fontWeight: 'bold', color: '#333', fontFamily: 'Roboto, sans-serif' }}>{player.username}</h2>
          </div>
          <div style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            {[...Array(player.stars)].map((_, i) => (
              <FaStar key={i} style={{ color: 'gold', marginRight: '5px' }} />
            ))}
          </div>
          <div style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <h2 style={{ marginBottom: '0', fontSize: '20px', fontWeight: 'bold', color: '#333', fontFamily: 'Roboto, sans-serif' }}>{player.question_count}</h2>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Leaderboard;