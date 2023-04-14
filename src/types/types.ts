export interface ICourseVideoPreview {
  link: string;
  duration: number;
  previewImageLink: string;
}

export interface IMeta {
  slug: string;
  skills: string[];
  courseVideoPreview: ICourseVideoPreview;
}

export interface ICourseItem {
  id: string;
  title: string;
  tags: string[];
  launchDate: Date;
  status: string;
  description: string;
  duration: number;
  lessonsCount: number;
  containsLockedLessons: boolean;
  previewImageLink: string;
  rating: number;
  meta: IMeta;
  lessons: VideoLesson[];
}

export interface VideoLesson {
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

export type CourseItemPreview = Pick<
  ICourseItem,
  'id' | 'title' | 'previewImageLink' | 'lessonsCount' | 'rating' | 'lessons'
> & { meta: Pick<IMeta, 'skills' | 'courseVideoPreview'> };
