import Button from '@material-ui/core/Button';
import { useNavigate } from 'react-router-dom';
import Leaderboard from './LeaderBoard/LeaderBoard';
import MockArticles from './MockArticles/MockArticles';
import ResourceLinks from './ResourcesLinks/ResourcesLinks';
import React, { useEffect, useState } from 'react';

const HomePage = () => {
  const navigate = useNavigate();
  const [newsData, setNewsData] = useState([]); // Initialize newsData state as an empty array

  useEffect(() => {
    const getLatestNewsData = () => {
      const apiUrl = 'https://newsapi.org/v2/everything?q=university%20of%london&from=2024-02-09&sortBy=publishedAt&apiKey=4f9a2b0c1efd40318cdf751d5b7444f1';
      
      fetch(apiUrl)
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then(data => {
          const seenTitles = new Set(); // Store seen titles to avoid duplicates
          const uniqueArticles = data.articles.filter(article => {
            const duplicate = seenTitles.has(article.title);
            seenTitles.add(article.title);
            return !duplicate;
          });
  
          // Slice to get only the first 3 unique articles if there are more
          const newsArticles = uniqueArticles.slice(0, 3).map((article, index) => ({
            id: index + 1,
            title: article.title,
            content: article.description,
            url: article.url,
            image: article.urlToImage
          }));
  
          setNewsData(newsArticles); // Update the state with fetched data
        })
        .catch(error => {
          console.error('There was a problem with your fetch operation:', error);
        });
    };
  
    getLatestNewsData(); // Call the function to fetch news data
  }, []); // The empty array ensures this effect runs only once after the initial render
  

  const glowButtonStyle = {
    width: '100%',
    height: '60px',
    marginBottom: '20px',
    backgroundColor: '#1976d2',
    color: '#fff',
    boxShadow: '0 0 10px #1976d2, 0 0 20px #1976d2, 0 0 30px #1976d2',
    transition: 'all 0.3s ease-in-out',
    '&:hover': {
      backgroundColor: '#115293',
      boxShadow: '0 0 15px #1976d2, 0 0 25px #1976d2, 0 0 35px #1976d2',
    },
  };

  const examCoursesData = [
    { id: 1, title: 'CM3020 - Artificial Intelligence', content: 'Exam Date: 05 March 2024', url: 'https://github.com/world-class/REPL?tab=readme-ov-file' },
    { id: 2, title: 'CM3025 - Virtual Reality', content: 'Exam Date: 04 March 2024.', url: 'https://github.com/world-class/REPL?tab=readme-ov-file' },
    { id: 3, title: 'CM3030 - Games Development', content: 'Exam Date: 05 March 2024', url: 'https://github.com/world-class/REPL?tab=readme-ov-file' },
    { id: 4, title: 'CM3035 - Advanced Web Development', content: 'Exam Date: 06 March 2024', url: 'https://github.com/world-class/REPL?tab=readme-ov-file' },
    { id: 5, title: 'CM3005 - Data Science', content: 'Exam Date: 03 March 2024', url: 'https://github.com/world-class/REPL?tab=readme-ov-file' },
    { id: 6, title: 'CM3030 - Games Development', content: 'Exam Date: 02 March 2024', url: 'https://github.com/world-class/REPL?tab=readme-ov-file' },
  ];

  return (
    <div style={{ marginBottom: '100px', fontFamily: 'Roboto, sans-serif' }}>
      <div style={{ display: 'flex', justifyContent: 'center', width: '100%', marginTop: '80px' }}>
        <div style={{ display: 'flex', width: '80%', margin: '0 auto' }}>
          <div style={{ flex: 2, paddingRight: '10px', width: '70%', margin: '0 auto' }}>
            <Button
              variant="contained"
              color="primary"
              size="large"
              onClick={() => navigate('/courseSelection')}
              style={glowButtonStyle} 
            >
              Select a Course for Quiz
            </Button>
            <MockArticles title= 'Notices and Events' data={newsData} style={{ marginTop: '20px' }} />
            <div style={{ marginTop: '20px' }}>
              <ResourceLinks />
            </div>
          </div>
          <div style={{ flex: 1 }}>
            <Leaderboard/>
            <div style={{ marginTop: '20px' }}>
              <MockArticles title= 'Courses' data={examCoursesData} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
