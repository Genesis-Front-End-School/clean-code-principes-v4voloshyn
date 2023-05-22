import clsx from 'clsx';
import { FC, useEffect, useState, useRef } from 'react';
import { useBeforeUnload } from 'react-router-dom';
import { v4 as uuid } from 'uuid';

import { MessageT } from './@types/types';
import { ChatForm } from './components/chat-form/ChatForm.component';
import { MessagesList } from './components/messages/messages-list/MessagesList.component';
import { WS_LINK } from './constants';

import './Chat.scss';

export const Chat: FC<{ isShow: boolean }> = ({ isShow }) => {
  const [messages, setMessages] = useState<MessageT[]>([]);
  const [connected, setConnected] = useState(false);

  const [usersOnline, setUsersOnline] = useState(0);

  const refId = useRef(uuid());
  const userSessionID = refId.current;

  const socket = useRef<WebSocket | null>(null);

  useEffect(() => {
    return () => {
      if (socket.current) {
        socket.current.close();
      }
    };
  }, []);

  useBeforeUnload(() => {
    if (socket.current) {
      socket.current.close();
    }
  });

  function connectWSUser(username: string) {
    socket.current = new WebSocket(WS_LINK);

    socket.current.onopen = () => {
      console.log(`You successfully connected!`);

      const message = {
        event: 'connection',
        username,
        sessionID: userSessionID,
      };

      if (socket.current) {
        socket.current.send(JSON.stringify(message));
      }
      setConnected(true);
    };

    socket.current.onmessage = (e) => {
      const incomeMessage: MessageT = JSON.parse(e.data);

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

  const handleConnect = (username: string) => {
    connectWSUser(username);
  };

  const sendMessage = (text: string) => {
    if (!text) return;

    const newMsg = {
      event: 'text',
      authorID: userSessionID,
      originalText: text,
    };

    if (socket.current) {
      socket?.current.send(JSON.stringify(newMsg));
    }
  };

  const statusMarkerStyle = clsx('status__marker', {
    status__marker_online: connected,
    status__marker_offline: !connected,
  });

  const status = connected ? 'connected' : 'offline';

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
          <MessagesList messages={messages} userSessionID={userSessionID} />
        )}
      </div>
      <ChatForm
        isShow={isShow}
        connected={connected}
        handleConnect={handleConnect}
        sendMessage={sendMessage}
      />
    </div>
  );
};
