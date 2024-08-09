'use client';

import { closeModal } from '@/libs/redux/features/modal-slice';
import { useAppDispatch } from '@/libs/redux/hooks';
import { Fab } from '@mui/material';

import CloseIcon from '@mui/icons-material/Close';
import React from 'react';

import styles from './styles.module.scss';

type CloseModalButtonProps = {
  onClick?: () => void;
};

const CloseModalButton = ({ onClick }: CloseModalButtonProps) => {
  const dispatch = useAppDispatch();

  const handleClick = () => {
    dispatch(closeModal());
  };

  return (
    <Fab
      className={styles.CloseModalButton}
      color={undefined}
      aria-label="close"
      onClick={onClick ?? handleClick}
    >
      <CloseIcon />
    </Fab>
  );
};

export default CloseModalButton;
