'use client';

import React, { useState } from 'react';
import { getPlaceWithStreetNumber } from '@/api/place';
import { TextField } from '@mui/material';
import { StreetNumberInterface } from '@/interfaces/location';
import { UseFormRegister, UseFormSetValue } from 'react-hook-form';
import { z } from 'zod';
import { newEventSchema } from '@/schema/event';

import debounce from 'debounce';
import InputFocusWrapper from '@/components/input-focus-wrapper/InputFocusWrapper';

import styles from './styles.module.scss';

type LocationInputProps = {
  setValue: UseFormSetValue<z.infer<typeof newEventSchema>>;
  register: UseFormRegister<z.infer<typeof newEventSchema>>;
};

const LocationInput = ({
  setValue,
  register,
}: LocationInputProps) => {
  const [places, setPlaces] = useState<StreetNumberInterface[]>([]);
  const [openResult, setOpenResult] = useState<boolean>(false);

  const handleSearch = debounce(async (value: string) => {
    if (value.length < 3) return;

    const searchResult = await getPlaceWithStreetNumber(value);
    setPlaces(searchResult);
  }, 300);

  const handleSelectResult = (place: StreetNumberInterface) => {
    setValue('location', `${place.name}, ${place.city}`);
    setValue('postalCode', parseInt(place.postcode));
    setOpenResult(false);
  };

  return (
    <div className={styles.LocationInput}>
      <InputFocusWrapper setOpenResult={setOpenResult}>
        <TextField
          type="text"
          variant="outlined"
          label="Adresse de départ (numéro de rue)"
          {...register('location')}
          onChange={(e) => {
            handleSearch(e.target.value);
          }}
          onFocus={() => setOpenResult(true)}
        />

        <ul>
          {openResult ? (
            places.length > 0 ? (
              places.map((place, index) => (
                <li
                  key={index}
                  onClick={() => handleSelectResult(place)}
                >
                  <span>{place.name}</span>
                  <span>{place.city}</span>
                </li>
              ))
            ) : (
              <li>Aucun résultat</li>
            )
          ) : null}
        </ul>
      </InputFocusWrapper>
    </div>
  );
};

export default LocationInput;
