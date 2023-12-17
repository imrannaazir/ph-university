import config from '../../config';
import { TStudent } from '../student/student.interface';
import Student from '../student/student.model';
import { TUser } from './user.interface';
import User from './user.model';

const createStudent = async (password: string, studentData: TStudent) => {
  const user: TUser = {
    id: '',
    password: '',
    role: 'student',
  };

  user.password = password ? password : config.default_password;

  user.role = 'student';

  user.id = '202210001';

  //create user
  const newUser = await User.create(user);

  //create student
  if (Object.keys(newUser).length) {
    studentData.id = newUser.id;
    studentData.user = newUser._id; // reference id

    const student = await Student.create(studentData);

    return student;
  }
};

export const UserService = {
  createStudent,
};
