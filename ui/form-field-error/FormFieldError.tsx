import React from 'react';

import WarningIcon from '@mui/icons-material/Warning';

import styles from './styles.module.scss';

type FormFieldErrorProps = {
  message?: string;
};

const FormFieldError = ({ message }: FormFieldErrorProps) => {
  if (!message) return;

  return (
    <div className={styles.FormFieldError}>
      <WarningIcon />
      <p>{message}</p>
    </div>
  );
};

export default FormFieldError;
