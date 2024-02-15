import React from "react";
import { Button, Layout } from "antd";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import { useAppDispatch } from "../../redux/hooks";
import { logOut } from "../../redux/features/auth/authSlice";

const { Header, Content } = Layout;

const MainLayout: React.FC = () => {
  const dispatch = useAppDispatch();
  return (
    <Layout style={{ height: "100vh" }}>
      <Sidebar />
      <Layout>
        <Header>
          <Button
            style={{ marginLeft: "95%" }}
            onClick={() => dispatch(logOut())}
          >
            Logout
          </Button>
        </Header>
        <Content style={{ margin: "24px 16px 0" }}>
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
