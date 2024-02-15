import About from "../pages/About";
import AcademicSemesterPage from "../pages/admin/AcademicSemester";
import AdminDashboard from "../pages/admin/AdminDashboard";
import CreateAdmin from "../pages/admin/CreateAdmin";
import CreateFaculty from "../pages/admin/CreateFaculty";
import CreateMember from "../pages/admin/CreateMember";
import CreateStudent from "../pages/admin/CreateStudent";
import { TPath } from "../types";

export const adminPaths: TPath[] = [
  {
    name: "Dashboard",
    path: "dashboard",
    element: <AdminDashboard />,
  },
  {
    name: "User Management",
    children: [
      {
        name: "Create Admin",
        path: "create-admin",
        element: <CreateAdmin />,
      },
      {
        name: "Create Student",
        path: "create-student",
        element: <CreateStudent />,
      },
      {
        name: "Create Faculty",
        path: "create-faculty",
        element: <CreateFaculty />,
      },
      {
        name: "Create Member",
        path: "create-member",
        element: <CreateMember />,
      },
      {
        name: "Academic Semester",
        path: "academic-semester",
        element: <AcademicSemesterPage />,
      },
    ],
  },
  {
    name: "About Us",
    path: "about-us",
    element: <About />,
  },
];
