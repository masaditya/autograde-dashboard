import Head from "next/head";
import { Layout, Menu, Table } from "antd";
import {
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import { signOut } from "next-auth/client";
import Sidebar from "./sidebar";

const { Header, Content, Footer, Sider } = Layout;

export const Wrapper = ({ children }) => {
  return (
    <>
      <Head>
        <title> Autograde System Dashboard </title>
      </Head>
      <Layout>
        <Sidebar />
        <Layout>
          <Header
            className="site-layout-sub-header-background"
            style={{ padding: 0 }}
          >
            <Menu
              theme="dark"
              mode="horizontal"
              style={{ float: "right" }}
              onSelect={() => signOut()}
            >
              <Menu.Item key="1">Logout</Menu.Item>
            </Menu>
          </Header>
          <Content style={{ margin: "24px 16px 0", overflow: "initial" }}>
            <div
              className="site-layout-background"
              style={{ padding: 24, minHeight: "100vh" }}
            >
              {children}
            </div>
          </Content>
          <Footer style={{ textAlign: "center" }}>
            Ant Design ©2018 Created by Ant UED
          </Footer>
        </Layout>
      </Layout>
    </>
  );
};