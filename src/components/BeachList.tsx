import React from 'react';

type Beach = {
  name: string;
  quality: string;
  description: string;
};

const beaches: Beach[] = [
  {
    name: 'Camps Bay',
    quality: 'Safe to Swim',
    description: 'The water quality is excellent, suitable for swimming.',
  },
  {
    name: 'Muizenberg',
    quality: 'Unsafe to Swim',
    description: 'High levels of bacteria detected, not recommended for swimming.',
  },
  {
    name: 'Clifton 4th Beach',
    quality: 'Safe to Swim',
    description: 'Clean and clear waters, ideal for a beach day.',
  },
];

const BeachList: React.FC = () => {
  return (
    <div>
      <header style={styles.header}>
        <h1>SeaClear - Beach Water Quality</h1>
      </header>
      
      <div style={styles.container}>
        <h2>Beaches in Cape Town</h2>
        <ul style={styles.beachList}>
          {beaches.map((beach, index) => (
            <li key={index} style={styles.beachItem}>
              <h3>{beach.name}</h3>
              <p><strong>Water Quality:</strong> {beach.quality}</p>
              <p>{beach.description}</p>
            </li>
          ))}
        </ul>
      </div>
      
      <footer style={styles.footer}>
        <p>© 2024 SeaClear. All rights reserved.</p>
      </footer>
    </div>
  );
};

const styles = {
  header: {
    backgroundColor: '#0044cc',
    color: 'white',
    padding: '1rem',
    textAlign: 'center' as const,
  },
  container: {
    padding: '2rem',
  },
  beachList: {
    listStyleType: 'none',
    padding: 0,
  },
  beachItem: {
    backgroundColor: 'white',
    margin: '0.5rem 0',
    padding: '1rem',
    borderRadius: '5px',
    boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
  },
  footer: {
    backgroundColor: '#0044cc',
    color: 'white',
    padding: '1rem',
    textAlign: 'center' as const,
    position: 'fixed' as const,
    bottom: 0,
    width: '100%',
  },
};

export default BeachList;
