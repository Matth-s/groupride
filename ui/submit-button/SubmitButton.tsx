import { LoadingButton } from '@mui/lab';
import React from 'react';

type SubmitButtonProps = {
  isPending: boolean;
  label: string;
  color?: 'error' | 'secondary';
  variant: 'outlined' | 'contained';
  onClick?: () => void;
  fullWidth?: boolean;
};

const SubmitButton = ({
  isPending,
  label,
  color,
  variant,
  onClick,
  fullWidth,
}: SubmitButtonProps) => {
  return (
    <LoadingButton
      fullWidth={fullWidth}
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
