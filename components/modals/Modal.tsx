import React from 'react';
import styles from './styles.module.scss';

type ModalProps = {
  children: React.ReactNode;
};

const Modal = ({ children }: ModalProps) => {
  return (
    <div className={styles.Modal}>
      <div className={styles.Content}>{children}</div>
    </div>
  );
};

export default Modal;
