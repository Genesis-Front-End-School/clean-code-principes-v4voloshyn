import { FC } from 'react';

import { IMeta } from '../../types/types';

import './SkillsList.scss';

interface SkillsListProps {
  skillsList: IMeta['skills'];
}

export const SkillsList: FC<SkillsListProps> = ({ skillsList }) => {
  if (!skillsList.length) {
    return <div>Secret inside the book</div>;
  }

  return (
    <div className="skill__wrapper skill">
      Skills:
      <div className="skill-list">
        {skillsList.map((skill) => {
          return (
            <div className="skill-item" key={skill}>
              <span className="skill-status" />
              <span className="skill-text">{skill}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
