import React from 'react';

type FormFieldErrorProps = {
  message?: string;
};

const FormFieldError = ({ message }: FormFieldErrorProps) => {
  if (!message) return;

  return (
    <div>
      <p>{message}</p>
    </div>
  );
};

export default FormFieldError;
