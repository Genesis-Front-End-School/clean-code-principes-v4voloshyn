import { FC } from 'react';
import { FaGithub } from 'react-icons/fa';

import './Footer.scss';

export const Footer: FC = () => {
  const currentYear: number = new Date().getFullYear();

  return (
    <div className="footer">
      <div className="footer__rights">
        {currentYear}. All Rights Reserved :)
      </div>
      <div className="footer__author">
        Made by:{' '}
        <a href="https://github.com/v4voloshyn" className="footer__author_link">
          Pavlo Voloshyn <FaGithub />
        </a>
      </div>
    </div>
  );
};
