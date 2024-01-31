// PROBLEM NEED TO FIX: if I provide new semester id created from starting but , when I send previous semester got bug again

import { TAcademicSemester } from '../academicSemester/academicSemester.interface';
import User from '../user/user.model';

const findLastStudentId = async () => {
  const lastStudent = await User.findOne({ role: 'student' }, { id: 1, _id: 0 })
    .lean()
    .sort({ createdAt: -1 });
  return lastStudent?.id ? lastStudent.id : undefined;
};

export const generateStudentId = async (payload: TAcademicSemester | null) => {
  let currentId = (0).toString();
  const lastStudentId = await findLastStudentId();

  if (lastStudentId) {
    const lastStudentIdYear = lastStudentId.substring(0, 4);
    const lastStudentIdSemesterCode = lastStudentId.substring(4, 6);

    const currentYear = payload?.year;
    const currentSemesterCode = payload?.semesterCode;

    if (
      lastStudentId &&
      lastStudentIdYear === currentYear &&
      lastStudentIdSemesterCode === currentSemesterCode
    ) {
      currentId = lastStudentId.substring(6);
    }
  }
  let incrementId = (Number(currentId) + 1).toString().padStart(4, '0');

  incrementId = `${payload?.year}${payload?.semesterCode}${incrementId}`;
  return incrementId;
};
