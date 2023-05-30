import { fireEvent, render } from '@testing-library/react';
import { useLoaderData } from 'react-router-dom';
import { Mock, MockedFunction, vi } from 'vitest';

import { ICourse } from '../../../../shared/@types/types';
import { mockLessonData } from '../../../../tests/__mocks__/course-data';

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

    const firstLessonWithTitle = getByText(/1\. Lesson Title 1/i);

    expect(firstLessonWithTitle).toBeInTheDocument();
  });

  it('renders the correct number of LessonItem components', () => {
    const { getAllByText } = render(
      <LessonsList
        handleChangeLessonData={handleChangeLessonDataMock}
        activeLessonVideoLink={activeLessonVideoLinkMock}
      />
    );

    const lessonsListLength = getAllByText(/lesson title/i).length;

    expect(lessonsListLength).toBe(mockLessonData.length);
  });

  it('calls handleChangeLessonData when LessonItem is clicked', async () => {
    const { getByText } = render(
      <LessonsList
        handleChangeLessonData={handleChangeLessonDataMock}
        activeLessonVideoLink={activeLessonVideoLinkMock}
      />
    );

    const lessonItem = getByText(/lesson title 1/i);

    expect(lessonItem).toBeInTheDocument();

    fireEvent.click(lessonItem);

    expect(handleChangeLessonDataMock).toHaveBeenCalledTimes(1);
  });
});
