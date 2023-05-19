export interface ICourseVideoPreview {
  link: string;
  duration: number;
  previewImageLink: string;
}

export interface ICourseMeta {
  slug: string;
  skills: string[];
  courseVideoPreview: ICourseVideoPreview;
}

export interface ICourse {
  id: string;
  title: string;
  tags: string[];
  launchDate: string;
  status: string;
  description: string;
  duration: number;
  lessonsCount: number;
  containsLockedLessons: boolean;
  previewImageLink: string;
  rating: number;
  meta: ICourseMeta;
  lessons: IVideoLesson[];
}

export interface IVideoLesson {
  id: string;
  title: string;
  duration: number;
  order: number;
  type: string;
  status: 'locked' | 'unlocked';
  link: string;
  previewImageLink: string;
  meta: unknown | null;
}

export type VideoPlayerSrcLinks = [
  IVideoLesson['link'],
  IVideoLesson['previewImageLink']
];
