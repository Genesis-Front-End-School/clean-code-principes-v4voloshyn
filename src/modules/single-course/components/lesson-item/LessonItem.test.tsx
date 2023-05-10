import { fireEvent, render } from '@testing-library/react';
import { Mock, vi, expect } from 'vitest';

import { IVideoLesson } from '../../../../shared/@types/types';

import { LessonItem } from './LessonItem.component';

global.scrollTo = vi.fn() as Mock;

const mockLesson: IVideoLesson = {
  id: '123',
  title: 'Test Lesson',
  status: 'unlocked',
  duration: 180,
  link: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
  previewImageLink: 'https://example.com/image-preview',
  order: 1,
  type: 'video',
  meta: {},
};

describe('LessonItem component', () => {
  it('renders correctly', () => {
    const { getByText, getByRole } = render(
      <LessonItem
        lessonData={mockLesson}
        handleChangeLessonData={() => {}}
        activeLessonVideoLink=""
      />
    );

    const titleElement = getByText('1. Test Lesson');
    const descriptionElement = getByText('3min');
    const checkboxElement = getByRole('checkbox');

    expect(titleElement).toBeInTheDocument();
    expect(descriptionElement).toBeInTheDocument();
    expect(checkboxElement).toBeInTheDocument();
  });

  it('calls handleChangeLessonData when lesson is clicked', () => {
    const mockHandleChangeLessonData = vi.fn();
    const { getByRole } = render(
      <LessonItem
        lessonData={mockLesson}
        handleChangeLessonData={mockHandleChangeLessonData}
        activeLessonVideoLink=""
      />
    );

    const lessonButton = getByRole('button');
    fireEvent.click(lessonButton);

    expect(mockHandleChangeLessonData).toHaveBeenCalledWith(
      'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      'https://example.com/image-preview/lesson-1.webp'
    );
  });
});
