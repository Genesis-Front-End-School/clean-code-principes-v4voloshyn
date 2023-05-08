import { FC } from 'react';

import { IMeta } from '../../types/types';

import './SkillsList.scss';

interface SkillsListProps {
  skillsList: IMeta['skills'];
}

export const SkillsList: FC<SkillsListProps> = ({ skillsList = [] }) => {
  if (!skillsList.length) {
    return <div className="skill__item">Secret inside the book</div>;
  }

  return (
    <div className="skill__wrapper skill">
      Skills:
      <div className="skill__list">
        {skillsList.map((skill) => {
          return (
            <div className="skill__item" key={skill}>
              <span className="skill__marker" />
              <span className="skill__text">{skill}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
