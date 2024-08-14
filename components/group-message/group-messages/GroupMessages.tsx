'use client';

import { pusherClient } from '@/libs/pusher';
import React, { useEffect, useRef, useState } from 'react';
import { find } from 'lodash';
import { MessageInterface } from '@/interfaces/message';
import Message from '@/ui/message/Message';

import styles from './styles.module.scss';

type GroupMessagesProps = {
  groupId: string;
  groupMessages: MessageInterface[] | [];
};

const GroupMessages = ({
  groupId,
  groupMessages,
}: GroupMessagesProps) => {
  const [messages, setMessages] =
    useState<MessageInterface[]>(groupMessages);

  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    pusherClient.subscribe(groupId);

    const messageHandler = (message: MessageInterface) => {
      setMessages((current) => {
        if (find(current, { id: message.id })) {
          return current;
        }

        return [...current, message];
      });

      bottomRef?.current?.scrollIntoView();
    };

    const messageDeletedHandler = (deletedMessage: {
      messageId: string;
    }) => {
      setMessages((current) =>
        current.filter(
          (message) => message.id !== deletedMessage.messageId
        )
      );
    };

    pusherClient.bind('messages:new', messageHandler);
    pusherClient.bind('message-deleted', messageDeletedHandler);

    return () => {
      pusherClient.unsubscribe(groupId);
      pusherClient.unbind('messages:new', messageHandler);
      pusherClient.unbind('message-deleted', messageDeletedHandler);
    };
  }, [groupId]);

  return (
    <div className={styles.GroupMessage}>
      {messages.map((message, index) => (
        <Message key={index} messageObject={message} />
      ))}
      <div ref={bottomRef} />
    </div>
  );
};

export default GroupMessages;
