'use client';

import React from 'react';
import { groupTypeArray } from '@/constants/sports';
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from '@mui/material';
import { UseFormRegister, UseFormSetValue } from 'react-hook-form';
import { z } from 'zod';
import { newGroupSchema } from '@/schema/group';

type GroupTypeProps = {
  register: UseFormRegister<z.infer<typeof newGroupSchema>>;
  setValue: UseFormSetValue<z.infer<typeof newGroupSchema>>;
};

const GroupType = ({ register, setValue }: GroupTypeProps) => {
  return (
    <FormControl>
      <InputLabel id="GroupType">Type du groupe</InputLabel>
      <Select
        labelId="GroupType"
        id="GroupType"
        defaultValue={'open'}
        {...register('groupType')}
        label="Type du groupe"
      >
        {groupTypeArray.map((item) => (
          <MenuItem value={item.value} key={item.name}>
            {item.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default GroupType;
