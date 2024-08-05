'use client';

import { useSession } from 'next-auth/react';
import { MessageInterface } from '@/interfaces/message';
import { useLongPress } from 'use-long-press';

import React from 'react';
import Image from 'next/image';
import styles from './styles.module.scss';

type MessageProps = {
  messageObject: MessageInterface;
};

const Message = ({ messageObject }: MessageProps) => {
  const { data: session, status } = useSession();
  const bind = useLongPress(() => {
    alert('Long pressed!');
  });
  if (status === 'loading') return null;

  const { userId, message, user } = messageObject;
  const isOwn = session?.user.id === userId;

  return (
    <div
      className={`${styles.Message} ${
        isOwn ? styles.IsOwn : styles.NotOwn
      }`}
    >
      <div className={styles.Body}>
        <p {...bind()}>{message}</p>
        <Image
          src={user.image || '/no-image-user.svg'}
          height={40}
          width={40}
          decoding="async"
          alt={user.username}
        />
      </div>
    </div>
  );
};

export default Message;
