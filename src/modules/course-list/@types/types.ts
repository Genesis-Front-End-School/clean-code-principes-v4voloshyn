import { ICourse, ICourseMeta } from '../../../shared/@types/types';

export type CourseItemPreview = Pick<
  ICourse,
  'id' | 'title' | 'previewImageLink' | 'lessonsCount' | 'rating'
> & { meta: Pick<ICourseMeta, 'skills' | 'courseVideoPreview'> };
