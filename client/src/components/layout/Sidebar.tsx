import { Layout, Menu } from "antd";
import sidebarItemsGenerator from "../../libs/sidebarItemsGenerator";
import { studentPaths } from "../../routes/student.route";
import { adminPaths } from "../../routes/admin.routes";
import { facultyPaths } from "../../routes/faculty.routes";
import { useAppSelector } from "../../redux/hooks";
import { selectUser } from "../../redux/features/auth/authSlice";
const { Sider } = Layout;

const Sidebar = () => {
  const user = useAppSelector(selectUser);
  const role = user?.role;

  const UserRole = {
    ADMIN: "admin",
    FACULTY: "faculty",
    STUDENT: "student",
  };
  let sidebarItems;

  switch (role) {
    case UserRole.STUDENT:
      sidebarItems = sidebarItemsGenerator(studentPaths, UserRole.STUDENT);
      break;
    case UserRole.ADMIN:
      sidebarItems = sidebarItemsGenerator(adminPaths, UserRole.ADMIN);
      break;
    case UserRole.FACULTY:
      sidebarItems = sidebarItemsGenerator(facultyPaths, UserRole.FACULTY);
      break;

    default:
      break;
  }
  return (
    <Sider
      breakpoint="lg"
      collapsedWidth="0"
      onBreakpoint={(broken) => {
        console.log(broken);
      }}
      onCollapse={(collapsed, type) => {
        console.log(collapsed, type);
      }}
    >
      <div
        style={{
          color: "white",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontSize: "3rem",
        }}
      >
        PH Uni
      </div>

      <Menu
        theme="dark"
        mode="inline"
        defaultSelectedKeys={["4"]}
        items={sidebarItems}
      />
    </Sider>
  );
};

export default Sidebar;
