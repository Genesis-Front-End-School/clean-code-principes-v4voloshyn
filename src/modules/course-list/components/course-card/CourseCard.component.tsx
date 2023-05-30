import { motion } from 'framer-motion';
import React, { FC, forwardRef, useEffect, useRef, useState } from 'react';
import { FaStar } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

import { Button } from '../../../../shared/UI/button/Button.component';
import { Spinner } from '../../../../shared/UI/spinner/Spinner.component';
import { VideoPlayer } from '../../../../shared/components/video-player/VideoPlayer.component';
import { CourseItemPreview } from '../../@types/types';
import { SkillsList } from '../skills-list/SkillsList.component';

import './CourseCard.scss';

interface Props {
  courseData: CourseItemPreview;
}

export const CourseCard: FC<Props> = forwardRef(
  ({ courseData }, motionRef: React.ForwardedRef<HTMLDivElement>) => {
    const { id, title, lessonsCount, meta, previewImageLink, rating } =
      courseData;
    const { skills, courseVideoPreview } = meta;
    const [isCoursePageLoading, setIsCoursePageLoading] = useState(false);
    const [isVideoPlaying, setIsVideoPlaying] = useState(false);
    const [showVideoPlayer, setShowVideoPlayer] = useState(false);

    const timeoutRef = useRef(0);

    const navigate = useNavigate();

    const videoPreviewLink = courseVideoPreview?.link;
    const SHOW_VIDEO_DELAY_MS = 1000;

    useEffect(() => {
      if (isVideoPlaying && videoPreviewLink) {
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
        }

        timeoutRef.current = window.setTimeout(() => {
          setShowVideoPlayer(true);
        }, SHOW_VIDEO_DELAY_MS);
      }

      return () => clearTimeout(timeoutRef.current);
    }, [isVideoPlaying, videoPreviewLink]);

    const startVideoOnMouseEnter = () => {
      setIsVideoPlaying(true);
    };

    const stopVideoOnMouseLeave = () => {
      setIsVideoPlaying(false);
      setShowVideoPlayer(false);
    };

    const goToCoursePage = (courseId: string): void => {
      setIsCoursePageLoading(true);
      navigate(`course/${courseId}`);
    };

    return (
      <div className="course__card card" ref={motionRef}>
        <div
          className="card__image"
          onMouseEnter={startVideoOnMouseEnter}
          onMouseLeave={stopVideoOnMouseLeave}
        >
          {showVideoPlayer ? (
            <VideoPlayer
              previewPoster={`${previewImageLink}/cover.webp`}
              isLight={false}
              videoTitle={title}
              srcUrl={videoPreviewLink}
              controls={false}
              muted
              playing
              onReady={() => {}}
            />
          ) : (
            <img src={`${previewImageLink}/cover.webp`} alt={title} />
          )}
        </div>
        <div className="card__body">
          <div className="card__description">
            <div className="card__title">
              <h4>{title}</h4>
            </div>
            <SkillsList skillsList={skills} />
          </div>
          <div className="card__footer">
            <Button
              buttonText={!isCoursePageLoading && 'Watch lessons'}
              onClick={() => goToCoursePage(id)}
              endIcon={isCoursePageLoading && <Spinner />}
              disabled={isCoursePageLoading}
            />
            <div className="card__footer_bottom">
              <div className="card__lessons">Lessons: {lessonsCount}</div>
              <div className="card__rating">
                {rating ? (
                  <>
                    Rating {rating}/5
                    <FaStar className="star" />
                  </>
                ) : (
                  'Not rated'
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
);

CourseCard.displayName = 'CourseCard';

export const MCourseCard = motion(CourseCard);
