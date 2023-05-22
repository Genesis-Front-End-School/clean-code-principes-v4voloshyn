import clsx from 'clsx';
import { FC } from 'react';

import { MessageT } from '../../../@types/types';

import './Message.scss';

interface MessageProps {
  message: MessageT;
  isAuthor: boolean;
}

export const Message: FC<MessageProps> = ({ message, isAuthor }) => {
  const listItemStyle = clsx('message', {
    message__sender: isAuthor,
    message__receiver: !isAuthor,
  });

  return (
    <li className={listItemStyle} key={message.msgID}>
      <span className="message__author">{message.author}</span>
      <p className="message__content">{message.originalText}</p>
      <span className="message__time">
        {new Date(message.timestamp).toLocaleTimeString().slice(0, -3)}
      </span>
    </li>
  );
};
