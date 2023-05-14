import clsx from 'clsx';
import { FC, useEffect, useState, useRef } from 'react';
import { v4 as uuid } from 'uuid';

import './Chat.scss';

const PREFIX = window.location.protocol === 'https:' ? 'wss' : 'ws';
const HOST = window.location.hostname;

const socket = new WebSocket(`${PREFIX}://${HOST}:8080`);
socket.onopen = () => {
  console.log(`You successfully connected!`);
};

socket.onerror = () => {
  console.log(`There something wrong with WebSocket connection...`);
};

socket.onclose = () => {
  console.log('WS was closed');
};

type Message = {
  authorID: string;
  msgID: string;
  author: string;
  originalText: string;
  timestamp: Date;
  online?: number;
};

export const Chat: FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [text, setText] = useState('');
  const [usersOnline, setUsersOnline] = useState(0);

  const refId = useRef(uuid());
  const userSessionID = refId.current;

  useEffect(() => {
    socket.addEventListener('message', (e) => {
      const incomeMessage: Message = JSON.parse(e.data);
      if (incomeMessage.online) {
        setUsersOnline(incomeMessage.online || 0);
      }
      console.log('income', incomeMessage);

      setMessages((prev) => [...prev, incomeMessage]);
    });
  }, []);

  const sendMessage = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newMsg = {
      authorID: userSessionID,
      author: 'Anonymous',
      originalText: text,
    };

    try {
      socket?.send(JSON.stringify(newMsg));
    } catch (err) {
      console.log('WARN', err);
    }
    setText('');
  };

  const handleChatTextInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };

  const isSender = (user: string): boolean => {
    return user === userSessionID;
  };

  const listItemStyle = (prop: string) =>
    clsx('message', {
      message__sender: isSender(prop),
      message__receiver: !isSender(prop),
    });

  return (
    <div className="chat chat-wrapper">
      {usersOnline}
      <div className="chat-window">
        {messages.length === 0 ? (
          <div className="no-message">
            Please, feel free to ask us anything about courses
          </div>
        ) : (
          <ul className="chat-list">
            {messages.map((msg) => (
              <li className={listItemStyle(msg.authorID)} key={msg.msgID}>
                <span className="message__author">{msg.author}</span>
                <p className="message__content">{msg.originalText}</p>
                <span className="message__time">
                  {new Date(msg.timestamp).toLocaleTimeString().slice(0, -3)}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>
      <form onSubmit={sendMessage}>
        <div className="chat__controls">
          <input
            className="chat__input"
            type="text"
            placeholder="Enter your question"
            value={text}
            onChange={handleChatTextInput}
          />
          <button type="submit" className="chat__send">
            Send
          </button>
        </div>
      </form>
    </div>
  );
};
