import React from 'react';

import styles from './styles.module.scss';

type FormSubmitSuccessProps = {
  message?: string;
};

const FormSubmitSuccess = ({ message }: FormSubmitSuccessProps) => {
  return (
    <div className={styles.FormSubmitSuccess}>
      <p>{message}</p>
    </div>
  );
};

export default FormSubmitSuccess;
