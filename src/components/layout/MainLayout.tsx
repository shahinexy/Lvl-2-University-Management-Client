import { Button, Layout } from "antd";
import { Outlet } from "react-router-dom";
import Sidebar from './Sidebar';
import { useAppDispatch } from "../../redux/hooks";
import { logout } from "../../redux/features/auth/authSlice";

const { Header, Content, Footer } = Layout;

const MainLayout = () => {

  const dispatch = useAppDispatch()

  const handleLogout = ()=>{
    dispatch(logout())
  }
  return (
    <div>
      <Layout>
        <Sidebar />
        <Layout>
          <Header style={{ padding: 0 }} >
            <Button onClick={handleLogout}>Logout</Button>
          </Header>
          <Content style={{ margin: "24px 16px 0" }}>
            <div
              style={{
                padding: 24,
                minHeight: 360,
              }}
            >
              <Outlet />
            </div>
          </Content>
          <Footer style={{ textAlign: "center" }}>
            Ant Design ©{new Date().getFullYear()} Created by Ant UED
          </Footer>
        </Layout>
      </Layout>
    </div>
  );
};

export default MainLayout;
