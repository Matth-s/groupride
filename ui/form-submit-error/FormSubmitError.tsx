import React from 'react';

type FormSubmitErrorProps = {
  message?: string;
};

const FormSubmitError = ({ message }: FormSubmitErrorProps) => {
  if (!message) return;

  return (
    <div>
      <p>{message}</p>
    </div>
  );
};

export default FormSubmitError;
