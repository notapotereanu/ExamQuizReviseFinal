import React from 'react';

const ResourceLinks = () => {
  const links = [
    { name: 'Student Portal', url: 'https://my.london.ac.uk/web/guest', backgroundUrl: 'https://upload.wikimedia.org/wikipedia/it/thumb/8/8b/UL_arms.png/150px-UL_arms.png' },
    { name: 'REPL', url: 'https://github.com/world-class/REPL', backgroundUrl: 'https://cdn-icons-png.flaticon.com/512/25/25231.png' },
    { name: 'Slack Chat', url: 'https://app.slack.com/client/TDT1N1BUG/C06438UTTSN', backgroundUrl: 'https://www.geekandjob.com/uploads/wiki/f1b303d1d90c584633a7a8e57fc8e1628db54cc7.png' },
    { name: 'Going Next Level', url: 'https://docs.google.com/spreadsheets/d/1vyRqV4BVxZx9nVJvLJtUYI19aAgChu-4aPunoVS7uAg/edit#gid=507585853', backgroundUrl: 'https://mailmeteor.com/logos/assets/PNG/Google_Sheets_Logo_512px.png' },
  ];

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
      {links.map((link, index) => (
        <a key={index} href={link.url} target="_blank" rel="noopener noreferrer" style={{ display: 'block', padding: '40px', backgroundImage: `url(${link.backgroundUrl})`, backgroundSize: 'contain', backgroundRepeat: 'no-repeat', backgroundColor: '#f9f9f9', borderRadius: '10px', textAlign: 'center', color: '#333', textDecoration: 'none', fontSize: '20px', fontWeight: 'bold' }}>
          {link.name}
        </a>
      ))}
    </div>
  );
};

export default ResourceLinks;