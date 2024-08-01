import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

import styles from './styles.module.scss';

type UserCardGroupProps = {
  user: {
    id: string;
    image: string | null;
    username: string;
  };
};

const UserCardGroup = ({ user }: UserCardGroupProps) => {
  return (
    <div className={styles.UserCardGroup}>
      <Link href={`/utilisateur/${user.id}`}>
        <Image
          src={user.image ? user.image : '/no-image-user.svg'}
          width={40}
          height={40}
          alt={user.username}
          decoding="async"
        />

        <p>{user.username}</p>
      </Link>
    </div>
  );
};

export default UserCardGroup;
