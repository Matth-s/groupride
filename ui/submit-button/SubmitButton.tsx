import { LoadingButton } from '@mui/lab';
import React from 'react';

type SubmitButtonProps = {
  isPending: boolean;
  label: string;
  color?: 'error';
  variant: 'outlined' | 'contained';
  onClick?: () => void;
};

const SubmitButton = ({
  isPending,
  label,
  color,
  variant,
  onClick,
}: SubmitButtonProps) => {
  return (
    <LoadingButton
      loading={isPending}
      variant={variant}
      type="submit"
      color={color}
      disabled={isPending}
      onClick={onClick}
    >
      {label}
    </LoadingButton>
  );
};

export default SubmitButton;
