import { Card } from 'primereact/card';
import React from 'react';

const PlayerCard = ({ title, position, city, division }) => {
  return (
    <Card title={title} className='flex w-full mb-3'>
      <p>Position - {position}</p>
      <p>City - {city}</p>
      <p>Division - {division}</p>
    </Card>
  );
};

export default PlayerCard;
