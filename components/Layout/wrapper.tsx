import Head from "next/head";
import { Layout, Menu, Table } from "antd";
import {
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import { signIn, signOut, useSession } from "next-auth/client";
import Sidebar from "./sidebar";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "context/ContextWrapper";
import { LoadingScreen } from "./loadingscreen";
const { Header, Content, Footer, Sider } = Layout;

export const Wrapper = ({ children }) => {
  const [session, loading] = useSession();
  const [loadDocs, setLoadDocs] = useState(false);
  const { setStudentClass, setIsDosen } = useContext(AppContext);

  useEffect(() => {
    if (!loading && !session) {
      signIn();
    } else {
      //@ts-ignore
      session ? setIsDosen(session.user.role !== "student") : setIsDosen(false);
      //@ts-ignore
      session && setStudentClass(session.user.kelas);
      setLoadDocs(true);
    }
    return () => {
      setLoadDocs(false);
    };
  }, [session, loading]);

  return (
    <>
      {!loadDocs ? (
        <LoadingScreen />
      ) : (
        <>
          <Head>
            <title> Autograde System Dashboard </title>
            <meta http-equiv="Content-Security-Policy" content="upgrade-insecure-requests"></meta>
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
      )}
    </>
  );
};
