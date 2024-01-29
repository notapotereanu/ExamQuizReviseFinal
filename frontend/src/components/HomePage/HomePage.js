import React from 'react';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Button from '@material-ui/core/Button';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const navigate = useNavigate();

  // Mock JSON data
  const newsData = [
    { id: 1, title: 'News 1', content: 'This is the first news item.', url: '/news1' },
    { id: 2, title: 'News 2', content: 'This is the second news item.', url: '/news2' },
    { id: 3, title: 'News 3', content: 'This is the third news item.', url: '/news3' },
  ];

  return (
    <div>
      <Header />
      <div style={{ display: 'flex', justifyContent: 'center', width: '100%', marginTop: '80px' }}>
        <div style={{ display: 'flex', width: '80%', margin: '0 auto' }}>
          <div style={{ flex: 2, paddingRight: '10px', width: '70%', margin: '0 auto', fontFamily: 'Arial, sans-serif' }}> {/* Adjust width and font family here */}
            <Button variant="contained" color="primary" size="large" onClick={() => navigate('/courseSelection')} style={{ width: '100%', marginBottom: '20px' }}>
              Select a Course for Quiz
            </Button>
            <div style={{ padding: '20px', backgroundColor: '#f9f9f9', borderRadius: '10px' }}>
              <h1 style={{ textAlign: 'center', color: '#333', marginBottom: '20px', fontSize: '2em' }}>Notices and Events</h1> {/* Adjust font size here */}
              {/* Render news from mock data */}
              {newsData.map((news, index) => (
                <div key={news.id} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '10px', backgroundColor: index % 2 === 0 ? '#fff' : '#eee', borderRadius: '5px' }}>
                  <a href={news.url} style={{ textDecoration: 'none', color: 'inherit' }}>
                    <h2 style={{ marginBottom: '10px', fontSize: '1.5em' }}>{news.title}</h2> {/* Adjust font size here */}
                  </a>
                  <p style={{ marginTop: '0', fontSize: '1em' }}>{news.content}</p> {/* Adjust font size here */}
                  {index < newsData.length - 1 && <hr style={{ width: '100%', borderTop: '1px solid #ddd' }} />} {/* Add a styled divider between news items */}
                </div>
              ))}
            </div>
          </div>
          <div style={{ flex: 1 }}>
            {/* Content for the second column (1/3 of the page) goes here */}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default HomePage;