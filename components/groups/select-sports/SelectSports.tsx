'use client';

import React from 'react';
import {
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from '@mui/material';
import {
  UseFormRegister,
  UseFormSetValue,
  UseFormWatch,
} from 'react-hook-form';
import { sportPraticedArray } from '@/constants/sports';
import { z } from 'zod';
import { newGroupSchema } from '@/schema/group';
import { SportPracticed } from '@/interfaces/groups';

type SelectSportsProps = {
  setValue: UseFormSetValue<z.infer<typeof newGroupSchema>>;
  values: UseFormWatch<z.infer<typeof newGroupSchema>>;
};

const SelectSports = ({ setValue, values }: SelectSportsProps) => {
  return (
    <div>
      <FormControl>
        <InputLabel id="sportPraticed">Sport pratiqué</InputLabel>
        <Select
          labelId="sportPraticed"
          id="sportPraticed"
          label="sportPraticed"
          multiple
          value={values('sportPraticed') || []}
          onChange={(event) =>
            setValue('sportPraticed', event.target.value as any)
          }
        >
          {sportPraticedArray.map((item) => (
            <MenuItem key={item.value} value={item.value}>
              {item.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
};

export default SelectSports;
