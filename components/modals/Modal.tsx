import React from 'react';
import CloseModalButton from '@/ui/close-modal-button/CloseModalButton';
import styles from './styles.module.scss';

type ModalProps = {
  children: React.ReactNode;
  title: string;
};

const Modal = ({ children, title }: ModalProps) => {
  return (
    <div className={styles.Modal}>
      <CloseModalButton />
      <div className={styles.Content}>
        <h2>{title}</h2>
        {children}
      </div>
    </div>
  );
};

export default Modal;
