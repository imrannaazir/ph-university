import config from '../../config';
import AcademicSemester from '../academicSemester/academicSemester.model';
import { TStudent } from '../student/student.interface';
import Student from '../student/student.model';
import { generateStudentId } from '../student/student.utils';
import { TUser } from './user.interface';
import User from './user.model';

const createStudent = async (password: string, payload: TStudent) => {
  const user: TUser = {
    id: '',
    password: '',
    role: 'student',
  };

  user.password = password ? password : config.default_password;

  user.role = 'student';

  const academicSemester = await AcademicSemester.findById(
    payload.admissionSemester
  );

  user.id = await generateStudentId(academicSemester);

  //create user
  const newUser = await User.create(user);

  //create student
  if (Object.keys(newUser).length) {
    payload.id = newUser.id;
    payload.user = newUser._id; // reference id

    const student = await Student.create(payload);

    return student;
  }
};

export const UserService = {
  createStudent,
};
