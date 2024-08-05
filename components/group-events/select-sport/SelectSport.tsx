'use client';

import { sportPraticedArray } from '@/constants/sports';
import { SportPracticed } from '@/interfaces/groups';
import { newEventSchema } from '@/schema/event';
import { formatSportName } from '@/utils/sports';
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from '@mui/material';
import { UseFormSetValue, UseFormWatch } from 'react-hook-form';
import { z } from 'zod';

type SelectSportProps = {
  setValue: UseFormSetValue<z.infer<typeof newEventSchema>>;
  sportSelected: UseFormWatch<z.infer<typeof newEventSchema>>;
  sportPraticed: SportPracticed[];
  groupId: string;
};

const SelectSport = ({
  setValue,
  groupId,
  sportPraticed,
  sportSelected,
}: SelectSportProps) => {
  return (
    <div>
      <FormControl>
        <InputLabel id="sportPraticed">Sport pratiqué</InputLabel>
        <Select
          labelId="sportPraticed"
          id="sportPraticed"
          label="sportPraticed"
          multiple
          value={sportSelected('sportPraticed')}
          onChange={(event) =>
            setValue('sportPraticed', event.target.value as any)
          }
        >
          {sportPraticed.length > 0
            ? sportPraticed.map((item) => (
                <MenuItem key={item} value={item}>
                  {formatSportName(item)}
                </MenuItem>
              ))
            : sportPraticedArray.map((item) => (
                <MenuItem key={item.value} value={item.value}>
                  {item.name}
                </MenuItem>
              ))}
        </Select>
      </FormControl>
    </div>
  );
};

export default SelectSport;
