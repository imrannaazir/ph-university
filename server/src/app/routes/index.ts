import { Router } from 'express';
import { UserRouters } from '../modules/user/user.route';
import { AcademicSemesterRouters } from '../modules/academicSemester/academicSemester.route';
import AcademicFacultyRoutes from '../modules/academicFaculty/academicFaculty.route';
import AcademicDepartmentRoutes from '../modules/academicDepartment/academicDepartment.route';
import StudentRoutes from '../modules/student/student.route';
import FacultyRoutes from '../modules/faculty/faculty.route';
import AdminRoutes from '../modules/admin/admin.route';
import CourseRoutes from '../modules/course/course.route';
import SemesterRegistrationRoutes from '../modules/semesterRegistration/semesterRegistration.route';
const router = Router();

type TModuleRoute = {
  path: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  route: any;
};

const moduleRoutes: TModuleRoute[] = [
  {
    path: '/users',
    route: UserRouters,
  },
  {
    path: '/students',
    route: StudentRoutes,
  },
  {
    path: '/academic-semester',
    route: AcademicSemesterRouters,
  },
  {
    path: '/academic-faculties',
    route: AcademicFacultyRoutes,
  },
  {
    path: '/academic-department',
    route: AcademicDepartmentRoutes,
  },
  {
    path: '/faculties',
    route: FacultyRoutes,
  },
  {
    path: '/admins',
    route: AdminRoutes,
  },
  {
    path: '/courses',
    route: CourseRoutes,
  },
  {
    path: '/semester-registration',
    route: SemesterRegistrationRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
