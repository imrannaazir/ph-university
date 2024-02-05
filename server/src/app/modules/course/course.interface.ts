import { Types } from 'mongoose';

export type TPreRequisite = {
  course: Types.ObjectId;
  isDeleted: boolean;
};

export type TCourse = {
  title: string;
  prefix: string;
  code: number;
  credits: number;
  isDeleted?: boolean;
  preRequisites?: TPreRequisite[];
};

export type TCourseFaculties = {
  course?: Types.ObjectId;
  faculties: [Types.ObjectId];
};
