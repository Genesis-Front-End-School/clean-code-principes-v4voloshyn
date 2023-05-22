import { FC } from 'react';

import { MessageT } from '../../../@types/types';
import { Message } from '../message/Message.component';

import './MessagesList.scss';

interface MessagesListProps {
  messages: MessageT[];
  userSessionID: string;
}

export const MessagesList: FC<MessagesListProps> = ({
  messages,
  userSessionID,
}) => {
  return (
    <ul className="message__list">
      {messages.map((msg) => (
        <Message
          message={msg}
          key={msg.msgID}
          isAuthor={userSessionID === msg.authorID}
        />
      ))}
    </ul>
  );
};
