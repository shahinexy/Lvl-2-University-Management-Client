import { Layout, Menu } from "antd";
import { Outlet } from "react-router-dom";
import { adminPaths } from "../../routes/admin.routes";
import { sidebarItemGenerator } from "../../utils/sidebarItemGenerator";

const { Header, Content, Footer, Sider } = Layout;

const MainLayout = () => {
  return (
    <div>
      <Layout>
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
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "4rem",
            }}
          >
            {" "}
            <h1 style={{ color: "white" }}>UNI</h1>
          </div>
          <Menu
            theme="dark"
            mode="inline"
            defaultSelectedKeys={["4"]}
            items={sidebarItemGenerator(adminPaths)}
          />
        </Sider>
        <Layout>
          <Header style={{ padding: 0 }} />
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
