import React from 'react';
import Button from '@material-ui/core/Button';
import { useNavigate } from 'react-router-dom';
import Leaderboard from './LeaderBoard/LeaderBoard';
import MockArticles from './MockArticles/MockArticles';

const HomePage = () => {
  const navigate = useNavigate();

  // Mock JSON data
  const newsData = [
    { id: 1, title: 'News 1', content: 'This is the first news item.', url: '/news1' },
    { id: 2, title: 'News 2', content: 'This is the second news item.', url: '/news2' },
    { id: 3, title: 'News 3', content: 'This is the third news item.', url: '/news3' },
  ];

  const leaderboardData = [
    { id: 1, name: 'Test', stars: 5, score: 100 },
    { id: 2, name: 'Bar', stars: 4, score: 90 },
    { id: 3, name: 'Foo', stars: 3, score: 80 },
    { id: 4, name: 'Beppino', stars: 2, score: 70 },
    { id: 5, name: 'Player 5', stars: 1, score: 60 },
  ];

  return (
    <div style={{ marginBottom: '100px' }}> { }
      <div style={{ display: 'flex', justifyContent: 'center', width: '100%', marginTop: '80px' }}>
        <div style={{ display: 'flex', width: '80%', margin: '0 auto' }}>
          <div style={{ flex: 2, paddingRight: '10px', width: '70%', margin: '0 auto', fontFamily: 'Arial, sans-serif' }}> { }
            <Button
              variant="contained" color="primary" size="large" onClick={() => navigate('/courseSelection')}
              style={{ width: '100%', height: '60px', marginBottom: '20px' }}> Select a Course for Quiz </Button>
            <MockArticles newsData={newsData} />
          </div>
          <div style={{ flex: 1 }}>
            <Leaderboard leaderboardData={leaderboardData} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;