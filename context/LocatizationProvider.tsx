import React from 'react';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider as MuiLocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { frFR } from '@mui/x-date-pickers/locales';

import 'dayjs/locale/fr';

type LocalizationProviderProps = {
  children: React.ReactNode;
};

const LocalizationProvider = ({
  children,
}: LocalizationProviderProps) => {
  return (
    <MuiLocalizationProvider
      dateAdapter={AdapterDayjs}
      adapterLocale="fr"
      localeText={
        frFR.components.MuiLocalizationProvider.defaultProps
          .localeText
      }
    >
      {children}
    </MuiLocalizationProvider>
  );
};

export default LocalizationProvider;
