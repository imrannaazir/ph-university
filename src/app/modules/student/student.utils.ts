import { TAcademicSemester } from '../academicSemester/academicSemester.interface';
import User from '../user/user.model';

const findLastStudentId = async () => {
  const lastStudent = await User.findOne({ role: 'student' }, { id: 1, _id: 0 })
    .lean()
    .sort({ createdAt: -1 });
  return lastStudent?.id ? lastStudent.id.substring(6) : undefined;
};

export const generateStudentId = async (payload: TAcademicSemester | null) => {
  const currentId = (await findLastStudentId()) || (0).toString();
  let incrementId = (Number(currentId) + 1).toString().padStart(4, '0');

  incrementId = `${payload?.year}${payload?.semesterCode}${incrementId}`;
  return incrementId;
};
