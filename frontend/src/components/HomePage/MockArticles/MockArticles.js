import React from 'react';

const MockArticles = ({ data }) => {
  return (
    <div style={{ padding: '20px', backgroundColor: '#f9f9f9', borderRadius: '10px' }}>
      <h1 style={{ textAlign: 'center', color: '#333', marginBottom: '20px', fontSize: '2em' }}>Notices and Events</h1>

      {data.map((news, index) => (
        <div key={news.id} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '10px', backgroundColor: index % 2 === 0 ? '#fff' : '#eee', borderRadius: '5px' }}>
          <a href={news.url} style={{ textDecoration: 'none', color: 'inherit' }}>
            <h2 style={{ marginBottom: '10px', fontSize: '1.5em' }}>{news.title}</h2>
          </a>
          <p style={{ marginTop: '0', fontSize: '1em' }}>{news.content}</p>
          {index < data.length - 1 && <hr style={{ width: '100%', borderTop: '1px solid #ddd' }} />}
        </div>
      ))}
    </div>
  );
};

export default MockArticles;