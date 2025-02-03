import { Layout, Menu, MenuProps } from "antd";

const { Header, Content, Footer, Sider } = Layout;

const items: MenuProps['items'] = [
    {
        key: '01',
        label: 'Dashboard'
    },
    {
        key: '02',
        label: 'Profile'
    },
    {
        key: '03',
        label: 'User Management',
        children: [
            {
                key: '11',
                label: 'Dashboard'
            },
            {
                key: '22',
                label: 'Profile'
            },
        ]
    },
]

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
          <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '4rem'}} > <h1 style={{color: 'white'}}>UNI</h1></div>
          <Menu
            theme="dark"
            mode="inline"
            defaultSelectedKeys={["4"]}
            items={items}
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
              <h1>The main content should go here</h1>
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
