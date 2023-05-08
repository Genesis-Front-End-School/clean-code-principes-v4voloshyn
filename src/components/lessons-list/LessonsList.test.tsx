import { fireEvent, render } from '@testing-library/react';
import { useLoaderData } from 'react-router-dom';
import { Mock, MockedFunction, vi } from 'vitest';

import { ICourse, IVideoLesson } from '../../@types/types';

import { LessonsList } from './LessonsList.component';

global.scrollTo = vi.fn() as Mock;

vi.mock('react-router-dom', () => ({
  useLoaderData: vi.fn(),
}));

describe('LessonsList', () => {
  const handleChangeLessonDataMock = vi.fn();
  const activeLessonVideoLinkMock = 'https://example.com/video';
  const useLoaderDataMock = useLoaderData as MockedFunction<
    typeof useLoaderData
  >;
  const mockLessonData: IVideoLesson[] = [
    {
      id: '1',
      title: 'Lesson 1',
      link: 'https://example.com/video1',
      previewImageLink: 'https://example.com/image1',
      order: 1,
      duration: 0,
      meta: {},
      status: 'unlocked',
      type: 'video',
    },
    {
      id: '2',
      title: 'Lesson 2',
      link: 'https://example.com/video2',
      previewImageLink: 'https://example.com/image2',
      order: 2,
      duration: 0,
      meta: {},
      status: 'unlocked',
      type: 'video',
    },
  ];

  const mockCourseData: Pick<ICourse, 'id' | 'title' | 'lessons'> = {
    id: '1',
    title: 'Course 1',
    lessons: mockLessonData,
  };

  beforeEach(() => {
    (useLoaderDataMock as Mock).mockReturnValue(mockCourseData);
  });

  it('renders without errors', () => {
    const { getByText } = render(
      <LessonsList
        handleChangeLessonData={handleChangeLessonDataMock}
        activeLessonVideoLink={activeLessonVideoLinkMock}
      />
    );

    expect(getByText('1. Lesson 1')).toBeInTheDocument();
  });

  it('renders the correct number of LessonItem components', () => {
    const { getAllByText } = render(
      <LessonsList
        handleChangeLessonData={handleChangeLessonDataMock}
        activeLessonVideoLink={activeLessonVideoLinkMock}
      />
    );

    expect(getAllByText(/lesson/i).length).toBe(mockLessonData.length);
  });

  it('calls handleChangeLessonData when LessonItem is clicked', async () => {
    const { getByText } = render(
      <LessonsList
        handleChangeLessonData={handleChangeLessonDataMock}
        activeLessonVideoLink={activeLessonVideoLinkMock}
      />
    );

    const lessonItem = getByText(/lesson 1/i);

    expect(lessonItem).toBeInTheDocument();

    fireEvent.click(lessonItem);

    expect(handleChangeLessonDataMock).toHaveBeenCalledTimes(1);
  });
});
