import { FC, useState, useEffect, useRef } from 'react';

import './ChatForm.scss';

interface ChatFormProps {
  connected: boolean;
  isShow: boolean;
  handleConnect: (username: string) => void;
  sendMessage: (text: string) => void;
}

export const ChatForm: FC<ChatFormProps> = ({
  connected,
  isShow,
  handleConnect,
  sendMessage,
}) => {
  const [text, setText] = useState('');

  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleChatTextInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };

  const connectUser = () => {
    handleConnect(text);
  };

  const onFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!text) {
      return;
    }

    if (connected) {
      sendMessage(text);
    } else {
      connectUser();
    }

    setText('');
  };

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [isShow]);

  const formPlaceholder = connected
    ? 'Enter you question'
    : 'Please, enter your name first';

  return (
    <form onSubmit={onFormSubmit}>
      <div className="form__controls">
        <input
          name="text"
          className="form__input"
          type="text"
          placeholder={formPlaceholder}
          value={text}
          onChange={handleChatTextInput}
          ref={inputRef}
        />

        <button type="submit" className="form__send">
          Send
        </button>
      </div>
    </form>
  );
};
