'use client';

import { TextField } from '@mui/material';
import React, { useState } from 'react';
import { UseFormRegister, UseFormSetValue } from 'react-hook-form';
import { newGroupSchema } from '@/schema/group';
import { z } from 'zod';
import { resultCityInterface } from '@/interfaces/location';

import styles from './styles.module.scss';

type LocationInputProps = {
  register: UseFormRegister<z.infer<typeof newGroupSchema>>;
  setValue: UseFormSetValue<z.infer<typeof newGroupSchema>>;
};

const LocationInput = ({
  register,
  setValue,
}: LocationInputProps) => {
  const [result, setResult] = useState<resultCityInterface[]>([]);

  const handleSearch = async (name: string) => {
    const result = await fetch(
      `https://geo.api.gouv.fr/communes?nom=${name}&fields=departement,codesPostaux&boost=population&limit=5`
    ).then((res) => res.json());

    setResult(result);
  };

  return (
    <div className={styles.LocationInput}>
      <TextField
        id="location"
        label="Localisation du groupe"
        {...register('location')}
        onChange={(e) => {
          setTimeout(() => {
            handleSearch(e.target.value);
          }, 300);
        }}
      />

      {result.length > 0 ? (
        <ul>
          {result.map((item, index: number) => (
            <li
              key={index}
              onClick={() => {
                setValue('location', item.nom);
                setValue('postalCode', item.codesPostaux);
                setResult([]);
              }}
            >
              <span>{item.nom}</span>
              <span>{item.codesPostaux[0]}</span>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
};

export default LocationInput;
