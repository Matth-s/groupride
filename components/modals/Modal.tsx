import React from 'react';
import CloseModalButton from '@/ui/close-modal-button/CloseModalButton';
import styles from './styles.module.scss';

type ModalProps = {
  children: React.ReactNode;
  title?: string;
  onClick?: () => void;
};

const Modal = ({ children, title, onClick }: ModalProps) => {
  return (
    <div className={styles.Modal}>
      <CloseModalButton onClick={onClick} />
      <div className={styles.Content}>
        {title ? <h2>{title}</h2> : null}
        {children}
      </div>
    </div>
  );
};

export default Modal;
