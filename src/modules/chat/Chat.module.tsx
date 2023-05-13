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
};

export const Chat: FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [text, setText] = useState('');

  const refId = useRef(uuid());
  const userID = refId.current;

  useEffect(() => {
    socket.addEventListener('message', (e) => {
      const incomeMessage: Message = JSON.parse(e.data);

      setMessages((prev) => [...prev, incomeMessage]);
    });
  }, []);

  const sendMessage = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newMsg = {
      authorID: userID,
      msgID: uuid(),
      author: 'Anonymous',
      originalText: text,
    };

    socket?.send(JSON.stringify(newMsg));
    setMessages((prev) => [...prev, newMsg]);
    setText('');
  };

  const handleChatTextInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };

  const isSender = (user: string): boolean => {
    return user === userID;
  };

  const cls = (prop: string) =>
    clsx({
      sender: isSender(prop),
      receiver: !isSender(prop),
    });

  return (
    <div className="chat chat-wrapper">
      <form onSubmit={sendMessage}>
        <div className="chat-window">
          <ul className="chat-list">
            {messages.map((m) => (
              <li key={m.msgID} className={cls(m.authorID)}>
                {!isSender(m.authorID) && m.author} {m.originalText}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <input
            type="text"
            placeholder="Enter your question"
            value={text}
            onChange={handleChatTextInput}
          />
          <button type="submit" className="send">
            Send
          </button>
        </div>
      </form>
    </div>
  );
};
