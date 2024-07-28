import { LoadingButton } from '@mui/lab';
import React from 'react';

type SubmitButtonProps = {
  isPending: boolean;
  label: string;
};

const SubmitButton = ({ isPending, label }: SubmitButtonProps) => {
  return (
    <LoadingButton
      loading={isPending}
      variant="outlined"
      type="submit"
    >
      {label}
    </LoadingButton>
  );
};

export default SubmitButton;
