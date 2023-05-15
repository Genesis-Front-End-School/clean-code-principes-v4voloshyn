import clsx from 'clsx';
import { FC, useEffect, useState, useRef } from 'react';
import { v4 as uuid } from 'uuid';

import './Chat.scss';

const PREFIX = window.location.protocol === 'https:' ? 'wss' : 'ws';
const HOST = window.location.hostname;

type Message = {
  authorID: string;
  msgID: string;
  author: string;
  originalText: string;
  timestamp: Date;
  online?: number;
};

export const Chat: FC<{ isShow: boolean }> = ({ isShow }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [text, setText] = useState('');
  const [usersOnline, setUsersOnline] = useState(0);
  const [connected, setConnected] = useState(false);

  const socketRef = useRef<WebSocket>(
    new WebSocket(`${PREFIX}://${HOST}:8080`)
  );

  const socket = socketRef.current;
  const refId = useRef(uuid());
  const inputRef = useRef<HTMLInputElement | null>(null);
  const userSessionID = refId.current;

  useEffect(() => {
    socket.onopen = () => {
      console.log(`You successfully connected!`);
      setConnected(true);
    };

    socket.onmessage = (e) => {
      const incomeMessage: Message = JSON.parse(e.data);
      if (incomeMessage.online) {
        setUsersOnline(incomeMessage.online);
      }
      console.log('income', incomeMessage);

      setMessages((prev) => [...prev, incomeMessage]);
    };

    socket.onclose = () => {
      console.log('WS was closed');
      setConnected(false);
    };

    socket.onerror = () => {
      console.log(`There something wrong with WebSocket connection...`);
      setConnected(false);
    };
  }, [socket]);

  const sendMessage = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newMsg = {
      authorID: userSessionID,
      author: 'Anonymous',
      originalText: text,
    };

    socket?.send(JSON.stringify(newMsg));

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

  const statusMarkerStyle = clsx('status__marker', {
    status__marker_online: connected,
    status__marker_offline: !connected,
  });

  const status = connected ? 'connected' : 'offline';

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [isShow]);

  return (
    <div className="chat chat-wrapper">
      <span className="chat__status status">
        <span className={statusMarkerStyle} /> You are {status}
      </span>
      {usersOnline}
      <div className="chat__window">
        {messages.length === 0 ? (
          <div className="no-message">
            Please, feel free to ask us anything about courses
            <br />
            Your connected status: {status}
          </div>
        ) : (
          <ul className="chat__list">
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
            ref={inputRef}
          />
          <button type="submit" className="chat__send">
            Send
          </button>
        </div>
      </form>
    </div>
  );
};
