import LocalizationProvider from '@/context/LocatizationProvider';
import React from 'react';
import { DatePicker as Picker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';

const DatePicker = () => {
  return (
    <LocalizationProvider>
      <Picker
        onChange={(newValue) => console.log(dayjs(newValue?.date()))}
      />
    </LocalizationProvider>
  );
};

export default DatePicker;
