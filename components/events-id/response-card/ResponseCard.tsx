import { UserResponseInterface } from '@/interfaces/events';
import Image from 'next/image';
import React from 'react';
import ClearIcon from '@mui/icons-material/Clear';
import styles from './styles.module.scss';

type ResponseCardProps = {
  user: UserResponseInterface;
};

const ResponseCard = ({ user }: ResponseCardProps) => {
  return (
    <li className={styles.ResponseCard}>
      <Image
        src={'/no-image-user.svg'}
        width={40}
        height={40}
        alt={user.username}
        decoding="async"
      />
      <p>{user.username}</p>
      <ClearIcon />
    </li>
  );
};

export default ResponseCard;
