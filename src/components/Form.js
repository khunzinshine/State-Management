import * as Yup from 'yup';

import { Form, Formik } from 'formik';

import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { MultiSelect } from 'primereact/multiselect';
import React from 'react';
import { modifiedArrays } from '../utils/common';
import { useSelector } from 'react-redux';

const TeamForm = ({ onSubmit, players }) => {
  const { data, detail } = useSelector((state) => state.team);

  let teamData = data.map((d) => d.data).filter((p) => p.player);
  let teamPlayers = teamData.map((t) => t.player);
  const filteredPlayers = players?.data?.filter((player) =>
    teamPlayers.map(
      (each) => !each.some((sub) => sub.name === player.first_name)
    )
  );
  let options = modifiedArrays(filteredPlayers);

  const TeamSchema = Yup.object().shape({
    name: Yup.string()
      .min(2, 'Too Short!')
      .max(50, 'Too Long!')
      .required('Required'),
    player: Yup.array().required('Required'),
    region: Yup.string()
      .min(2, 'Too Short!')
      .max(50, 'Too Long!')
      .required('Required'),
    country: Yup.string()
      .min(2, 'Too Short!')
      .max(50, 'Too Long!')
      .required('Required'),
  });

  const playerTemplate = (option) => {
    return (
      <div className='flex align-items-center'>
        <div key={option.id}>{option.name}</div>
      </div>
    );
  };
  const panelFooterTemplate = (value) => {
    const length = value ? value.length : 0;

    return (
      <div className='py-2 px-3'>
        <b>{length}</b> player{length > 1 ? 's' : ''} selected.
      </div>
    );
  };

  return (
    <Formik
      initialValues={{
        name: detail ? detail.data?.name : '',
        player: detail ? detail.data?.player : [],
        region: detail ? detail.data?.region : '',
        country: detail ? detail.data?.country : '',
      }}
      validationSchema={TeamSchema}
      onSubmit={onSubmit}
    >
      {({ values, errors, touched, handleChange }) => (
        <Form>
          <div className='m-20 align-items-center justify-content-center'>
            <div>
              <label htmlFor='name' className='block text-900 font-medium mb-2'>
                Username
              </label>
              <InputText
                id='name'
                type='text'
                autoComplete='name'
                value={values.name}
                onChange={handleChange}
                validateOnly={values.name && !errors.name}
                placeholder='Name'
                className='w-full mb-3'
              />
              {errors.name && touched.name ? <div>{errors.name}</div> : null}
              <label
                htmlFor='player'
                className='block text-900 font-medium mb-2'
              >
                Player
              </label>
              <MultiSelect
                id='player'
                value={values.player}
                options={options}
                onChange={handleChange}
                optionLabel='name'
                placeholder='Select Player'
                itemTemplate={playerTemplate}
                panelFooterTemplate={panelFooterTemplate(values.player)}
                className='w-full mb-3'
                display='chip'
              />
              {errors.player && touched.player ? (
                <div>{errors.player}</div>
              ) : null}

              <label
                htmlFor='region'
                className='block text-900 font-medium mb-2'
              >
                Region
              </label>
              <InputText
                id='region'
                type='text'
                autoComplete='region'
                value={values.region}
                onChange={handleChange}
                validateOnly={values.password && !errors.password}
                placeholder='Region'
                className='w-full mb-3'
              />
              {errors.region && touched.region ? (
                <div>{errors.region}</div>
              ) : null}

              <label
                htmlFor='country'
                className='block text-900 font-medium mb-2'
              >
                Country
              </label>
              <InputText
                id='country'
                type='text'
                autoComplete='country'
                value={values.country}
                onChange={handleChange}
                validateOnly={values.password && !errors.password}
                placeholder='Country'
                className='w-full mb-3'
              />
              {errors.country && touched.country ? (
                <div>{errors.country}</div>
              ) : null}
            </div>
          </div>
          <div className='flex justify-content-end'>
            <Button icon='pi pi-check' label='Submit' type='submit' />
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default TeamForm;
