import React from 'react';

import styles from './styles.module.scss';

type FormSubmitErrorProps = {
  message?: string;
};

const FormSubmitError = ({ message }: FormSubmitErrorProps) => {
  if (!message) return;

  return (
    <div className={styles.FormSubmitError}>
      <p>{message}</p>
    </div>
  );
};

export default FormSubmitError;
