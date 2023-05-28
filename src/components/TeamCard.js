import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import React from 'react';

const TeamCard = ({ name, playerCount, region, country, onDelete, onEdit }) => {
  const footer = (
    <div className='flex flex-wrap gap-2'>
      <Button
        label='Edit'
        icon='pi pi-file-edit'
        className='p-button-outlined p-button-secondary'
        severity='info'
        onClick={onEdit}
      />
      <Button
        label='Delete'
        icon='pi pi-trash'
        severity='danger'
        onClick={onDelete}
        className='p-button-outlined p-button-secondary'
      />
    </div>
  );

  return (
    <Card
      title={name}
      subTitle={`${playerCount} players`}
      footer={footer}
      className='flex w-full mb-3 mt-5'
    >
      <p className='m-0'>{region}</p>
      <p className='m-0'>{country}</p>
    </Card>
  );
};

export default TeamCard;
