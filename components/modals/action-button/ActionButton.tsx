import React from 'react';

import styles from './styles.module.scss';

type ActionButtonProps = {
  children: React.ReactNode;
};

const ActionButton = ({ children }: ActionButtonProps) => {
  return <div className={styles.ActionButton}>{children}</div>;
};

export default ActionButton;
