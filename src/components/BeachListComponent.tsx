import React from 'react';
import { Beach } from '../types/types';

type BeachListProps = {
  beaches: Beach[];
  onSelectBeach: (beach: Beach) => void;
};

const BeachListComponent: React.FC<BeachListProps> = ({ beaches, onSelectBeach }) => {
  return (
    <ul>
      {beaches.map(beach => (
        <li key={beach.name} onClick={() => onSelectBeach(beach)}>
          {beach.name}
        </li>
      ))}
    </ul>
  );
};

export default BeachListComponent;
