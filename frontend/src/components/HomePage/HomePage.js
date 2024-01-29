import React from 'react';
import Button from '@material-ui/core/Button';
import { useNavigate } from 'react-router-dom';
import Leaderboard from './LeaderBoard/LeaderBoard';
import MockArticles from './MockArticles/MockArticles';
import ResourceLinks from './ResourcesLinks/ResourcesLinks';

const HomePage = () => {
  const navigate = useNavigate();

  const newsData = [
    { id: 1, title: 'News 1', content: 'This is the first news item.', url: '/news1' },
    { id: 2, title: 'News 2', content: 'This is the second news item.', url: '/news2' },
    { id: 3, title: 'News 3', content: 'This is the third news item.', url: '/news3' },
  ];

  const examCoursesData = [
    { id: 1, title: 'CM1020 - Descrite Math', content: 'Date: Sunday 04 March 2024.', url: '/news1' },
    { id: 2, title: 'CM3070 - Final Project', content: 'Date: Monday 05 March 2024', url: '/news2' },
    { id: 3, title: 'CM2010 - Software Design', content: 'Date: Monday 05 March 2024', url: '/news3' },
  ];

  const leaderboardData = [
    { id: 1, name: 'Test', stars: 5, score: 100 },
    { id: 2, name: 'Bar', stars: 4, score: 90 },
    { id: 3, name: 'Foo', stars: 3, score: 80 },
    { id: 4, name: 'Beppino', stars: 2, score: 70 },
    { id: 5, name: 'Steve', stars: 1, score: 60 },
  ];

  return (
    <div style={{ marginBottom: '100px', fontFamily: 'Roboto, sans-serif' }}>
      <div style={{ display: 'flex', justifyContent: 'center', width: '100%', marginTop: '80px' }}>
        <div style={{ display: 'flex', width: '80%', margin: '0 auto' }}>
          <div style={{ flex: 2, paddingRight: '10px', width: '70%', margin: '0 auto' }}>
            <Button
              variant="contained" color="primary" size="large" onClick={() => navigate('/courseSelection')}
              style={{ width: '100%', height: '60px', marginBottom: '20px' }}> Select a Course for Quiz </Button>
            <MockArticles data={newsData} style={{ marginTop: '20px' }} />
            <div style={{ marginTop: '20px' }}>
              <ResourceLinks/>
            </div>
          </div>
          <div style={{ flex: 1 }}>
            <Leaderboard leaderboardData={leaderboardData} />
            <div style={{ marginTop: '20px' }}>
              <MockArticles data={examCoursesData} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;