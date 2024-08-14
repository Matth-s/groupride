'use client';

import { useSession } from 'next-auth/react';
import { MessageInterface } from '@/interfaces/message';
import { useLongPress } from 'use-long-press';
import { useAppDispatch } from '@/libs/redux/hooks';
import { openModalDeleteMessage } from '@/libs/redux/features/modal-slice';

import React from 'react';
import Image from 'next/image';
import styles from './styles.module.scss';

type MessageProps = {
  messageObject: MessageInterface;
};

const Message = ({ messageObject }: MessageProps) => {
  const { data: session, status } = useSession();
  const dispatch = useAppDispatch();

  if (status === 'loading') return null;

  const { userId, message, user, conversationId, id } = messageObject;

  const bind = useLongPress(() => {
    dispatch(
      openModalDeleteMessage({
        open: true,
        messageId: id,
        ownerIdMessage: userId,
        conversationId: conversationId,
      })
    );
  });

  const isOwn = session?.user.id === userId;

  return (
    <div
      className={`${styles.Message} ${
        isOwn ? styles.IsOwn : styles.NotOwn
      }`}
    >
      <div className={styles.Body}>
        <p
          {...bind()}
          style={{
            cursor: isOwn ? 'pointer' : 'unset',
          }}
        >
          {message}
        </p>
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
