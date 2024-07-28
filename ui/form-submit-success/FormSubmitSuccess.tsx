import React from 'react';

type FormSubmitSuccessProps = {
  message?: string;
};

const FormSubmitSuccess = ({ message }: FormSubmitSuccessProps) => {
  return (
    <div>
      <p>{message}</p>
    </div>
  );
};

export default FormSubmitSuccess;
