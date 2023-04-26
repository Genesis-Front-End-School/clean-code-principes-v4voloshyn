import { FC, useState, useEffect, useCallback } from 'react';
import { useLoaderData, useNavigation } from 'react-router-dom';

import { Spinner } from '../../components/spinner/Spinner.component';
import { LessonsList } from '../../components/lessons-list/LessonsList.component';
import { VideoPlayer } from '../../components/video-player/VideoPlayer.component';

import {
  ICourseItem,
  VideoLesson,
  VideoPlayerSrcLinks,
} from '../../types/types';

import {
  formatSlug,
  getTotalLessonsDurationInMin,
  formatPreviewImageURL,
} from './utils/utils';

import './Course.scss';

export const Course: FC = () => {
  const {
    lessons,
    title,
    description,
    meta: { slug },
  } = useLoaderData() as ICourseItem;
  const [hlsUrl, setHlsUrl] = useState('');
  const [lessonPreviewImgUrl, setLessonPreviewImgUrl] = useState('');

  const { state: pageLoadingStatus } = useNavigation();

  const courseSlug = formatSlug(slug);

  const firstLessonByOrderLinks = useCallback(
    (lessonsList: VideoLesson[]): VideoPlayerSrcLinks => {
      const firstLesson = lessonsList.filter((lesson) => lesson.order === 1);
      const lessonImagePreviewLink = formatPreviewImageURL(
        firstLesson[0].previewImageLink,
        1
      );
      return [firstLesson[0].link, lessonImagePreviewLink];
    },
    []
  );

  const handleChangeLessonData = (
    videoSrc: string,
    imagePreviewLink: string
  ): void => {
    setHlsUrl(videoSrc);
    setLessonPreviewImgUrl(imagePreviewLink);
  };

  useEffect(() => {
    handleChangeLessonData(...firstLessonByOrderLinks(lessons));

    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [firstLessonByOrderLinks, lessons]);

  if (pageLoadingStatus === 'loading') {
    return <Spinner variant="fullscreen" />;
  }

  return (
    <div className="course course__wrapper">
      <div className="course__main">
        <div className="player__wrapper">
          <VideoPlayer
            srcUrl={hlsUrl}
            videoTitle={title}
            previewPoster={`${lessonPreviewImgUrl}`}
          />
        </div>
        <div className="course__description">
          <h1 className="course__title">{title}</h1>
          <h4 className="course__slag">Slug: {courseSlug}</h4>
          <p className="course__descr">{description}</p>
        </div>
      </div>
      <div className="course__lessons">
        <div className="course__lessons-info">
          <div className="course__lessons-progress">
            Lessons 0 / {lessons.length}
          </div>
          <div className="course__lessons-timetotal">
            {Math.trunc(getTotalLessonsDurationInMin(lessons))}min total
          </div>
        </div>
        <LessonsList
          handleChangeLessonData={handleChangeLessonData}
          activeLessonVideoLink={hlsUrl}
        />
      </div>
    </div>
  );
};
