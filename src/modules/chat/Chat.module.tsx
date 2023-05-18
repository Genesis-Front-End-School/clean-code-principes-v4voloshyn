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
  online: number;
  event: string;
};

export const Chat: FC<{ isShow: boolean }> = ({ isShow }) => {
  const [username, setUsername] = useState('');

  const [messages, setMessages] = useState<Message[]>([]);
  const [text, setText] = useState('');
  const [usersOnline, setUsersOnline] = useState(0);
  const [connected, setConnected] = useState(false);

  const refId = useRef(uuid());
  const userSessionID = refId.current;
  const inputRef = useRef<HTMLInputElement | null>(null);

  const socket = useRef<WebSocket | null>(null);

  useEffect(() => {
    return () => {
      if (socket.current) {
        socket.current.close();
      }
    };
  }, []);

  function connectWS() {
    socket.current = new WebSocket(`${PREFIX}://${HOST}:8080`);

    socket.current.onopen = () => {
      console.log(`You successfully connected!`);

      const message = {
        event: 'connection',
        username: text,
        sessionID: userSessionID,
      };

      if (socket.current) {
        socket.current.send(JSON.stringify(message));
      }
      setConnected(true);
      setText('');
    };

    socket.current.onmessage = (e) => {
      const incomeMessage: Message = JSON.parse(e.data);

      if (incomeMessage.event === 'connection') {
        setUsersOnline(incomeMessage.online);
      }
      if (incomeMessage.event === 'leave') {
        setUsersOnline(incomeMessage.online);
      }

      if (incomeMessage.event === 'text') {
        setMessages((prev) => [...prev, incomeMessage]);
      }
    };

    socket.current.onclose = () => {
      console.log('WS was closed');
      setConnected(false);

      const message = {
        event: 'leave',
        username,
        sessionID: userSessionID,
      };

      if (socket.current) {
        socket.current.send(JSON.stringify(message));
        socket.current.close();
      }
    };

    socket.current.onerror = () => {
      console.log(`There something wrong with WebSocket connection...`);
      setConnected(false);
    };
  }

  const handleConnect = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setUsername(text);
    connectWS();
  };

  const sendMessage = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!text) return;

    const newMsg = {
      event: 'text',
      authorID: userSessionID,
      originalText: text,
    };

    if (socket.current) {
      socket?.current.send(JSON.stringify(newMsg));
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
      <div className="chat__window">
        {messages.length === 0 ? (
          <div className="no-message">
            Please, feel free to ask us anything about courses
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
      <form onSubmit={connected ? sendMessage : handleConnect}>
        <div className="chat__controls">
          <input
            name="text"
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
