'use client';

import { closeModal } from '@/libs/redux/features/modal-slice';
import { useAppDispatch } from '@/libs/redux/hooks';
import { Button } from '@mui/material';

type CancelButtonModalProps = {
  isDisabled: boolean;
  label: string;
};

const CancelButtonModal = ({
  isDisabled,
  label,
}: CancelButtonModalProps) => {
  const dispatch = useAppDispatch();

  return (
    <Button
      disabled={isDisabled}
      onClick={() => dispatch(closeModal())}
      variant="contained"
    >
      {label}
    </Button>
  );
};

export default CancelButtonModal;
