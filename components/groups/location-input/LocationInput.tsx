'use client';

import { Button, InputAdornment, TextField } from '@mui/material';
import React, { useState } from 'react';
import { UseFormRegister, UseFormSetValue } from 'react-hook-form';
import { newGroupSchema } from '@/schema/group';
import { z } from 'zod';
import { resultCityInterface } from '@/interfaces/location';

import PlaceIcon from '@mui/icons-material/Place';
import ClearIcon from '@mui/icons-material/Clear';
import ArrowDropDownTwoToneIcon from '@mui/icons-material/ArrowDropDownTwoTone';

import styles from './styles.module.scss';
import InputFocusWrapper from '@/components/input-focus-wrapper/InputFocusWrapper';

type LocationInputProps = {
  register: UseFormRegister<z.infer<typeof newGroupSchema>>;
  setValue: UseFormSetValue<z.infer<typeof newGroupSchema>>;
  value: string | undefined;
};

const LocationInput = ({
  register,
  setValue,
  value,
}: LocationInputProps) => {
  const [result, setResult] = useState<resultCityInterface[]>([]);
  const [openResult, setOpenResult] = useState<boolean>(false);

  const handleSearch = async (name: string) => {
    const result = await fetch(
      `https://geo.api.gouv.fr/communes?nom=${name}&fields=departement,codesPostaux&boost=population&limit=5`
    ).then((res) => res.json());

    setResult(result);
  };

  return (
    <div className={styles.LocationInput}>
      <InputFocusWrapper setOpenResult={setOpenResult}>
        <TextField
          id="location"
          label="Localisation du groupe"
          {...register('location')}
          onClick={() => handleSearch(value ?? '')}
          onChange={(e) => {
            setTimeout(() => {
              void handleSearch(e.target.value);
            }, 300);
            setValue('location', e.target.value);
          }}
          onFocus={() => setOpenResult(true)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <PlaceIcon />
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position="end">
                {value ? (
                  <Button
                    onClick={() => {
                      setValue('location', undefined);
                      setValue('postalCode', undefined);
                      setOpenResult(false);
                      setResult([]);
                    }}
                  >
                    <ClearIcon />
                  </Button>
                ) : (
                  <ArrowDropDownTwoToneIcon />
                )}
              </InputAdornment>
            ),
          }}
        />

        {openResult && result.length > 0 ? (
          <ul>
            {result.map((item, index: number) => (
              <li
                key={index}
                onMouseDown={() => {
                  setValue('location', item.nom);
                  setValue('postalCode', item.codesPostaux);
                  setOpenResult(false);
                }}
              >
                <span>{item.nom}</span>
                <span>{item.codesPostaux[0]}</span>
              </li>
            ))}
          </ul>
        ) : null}
      </InputFocusWrapper>
    </div>
  );
};

export default LocationInput;
