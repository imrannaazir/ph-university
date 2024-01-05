import { Router } from 'express';
import { UserRouters } from '../modules/user/user.route';
import { AcademicSemesterRouters } from '../modules/academicSemester/academicSemester.route';
import AcademicFacultyRoutes from '../modules/academicFaculty/academicFaculty.route';
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
    path: '/academic-semester',
    route: AcademicSemesterRouters,
  },
  {
    path: '/academic-faculties',
    route: AcademicFacultyRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
