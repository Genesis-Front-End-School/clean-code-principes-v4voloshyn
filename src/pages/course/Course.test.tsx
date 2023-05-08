import { render, screen } from '@testing-library/react';
import { useLoaderData, useNavigation } from 'react-router-dom';
import { Mock, MockedFunction, vi } from 'vitest';

import { Course } from './Course.page';

vi.mock('react-router-dom', () => ({
  useLoaderData: vi.fn(),
  useNavigation: vi.fn(),
}));

vi.mock('../../components/video-player/VideoPlayer.component.tsx', () => ({
  VideoPlayer: () => <div data-testid="video-test">Mock Video Player</div>,
}));

vi.mock('../../components/lessons-list/LessonsList.component.tsx', () => ({
  LessonsList: () => <div data-testid="lesson-list">Mock Lessons List</div>,
}));

vi.mock('../../components/common/UI/spinner/Spinner.component.tsx', () => ({
  Spinner: () => <div data-testid="spinner-test">Mock Spinner</div>,
}));

global.scrollTo = vi.fn() as Mock;

describe('Course page', () => {
  const courseData = {
    title: 'Sample Course Title',
    description: 'Sample course description.',
    meta: {
      slug: 'Best course',
    },
    lessons: [
      {
        title: 'Sample Lesson Title 1',
        link: 'http://example.com/lesson1.m3u8',
        previewImageLink: 'http://example.com/lesson1-preview.png',
        order: 1,
        duration: 120,
      },
      {
        title: 'Sample Lesson Title 2',
        link: 'http://example.com/lesson2.m3u8',
        previewImageLink: 'http://example.com/lesson2-preview.png',
        order: 2,
        duration: 180,
      },
    ],
  };

  const useLoaderDataMock = useLoaderData as MockedFunction<
    typeof useLoaderData
  >;
  const useNavigationMock = useNavigation as MockedFunction<
    typeof useNavigation
  >;

  beforeEach(() => {
    (useLoaderDataMock as Mock).mockReturnValue(courseData);
    (useNavigationMock as Mock).mockResolvedValue({ state: 'idle' });
  });

  afterEach(() => {
    vi.resetAllMocks();
  });

  it('renders a spinner when the page is loading', () => {
    (useNavigationMock as Mock).mockReturnValue({ state: 'loading' });

    render(<Course />);

    expect(screen.getByTestId('spinner-test')).toBeInTheDocument();
    (useNavigationMock as Mock).mockReturnValue({ state: 'idle' });
  });

  it('renders the course data when it is loaded', () => {
    render(<Course />);

    expect(screen.getByText(courseData.title)).toBeInTheDocument();
    expect(
      screen.getByText(`Slug: ${courseData.meta.slug}`)
    ).toBeInTheDocument();
    expect(screen.getByText(courseData.description)).toBeInTheDocument();
    expect(
      screen.getByText(`Lessons 0 / ${courseData.lessons.length}`)
    ).toBeInTheDocument();
    expect(screen.getByText(`5min total`)).toBeInTheDocument();
  });
});
