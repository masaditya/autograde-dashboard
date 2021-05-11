import "antd/dist/antd.css";
import { AppProps } from "next/app";
import { Layout } from "antd";
import Sidebar from "components/Layout/sidebar";
import { Provider, useSession } from "next-auth/client";
import { signIn, signOut } from "next-auth/client";
import { useRouter } from "next/router";

const { Header, Content, Footer } = Layout;

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider session={pageProps.session}>
      <Component {...pageProps} />
      {/* <Layout>
        <Sidebar />
        <Layout className="site-layout" style={{ marginLeft: 200 }}>
          <Header className="site-layout-background" style={{ padding: 0 }} />
          <Content style={{ margin: "24px 16px 0", overflow: "initial" }}>
            
          </Content>
          <Footer style={{ textAlign: "center" }}>
            Ant Design ©2018 Created by Ant UED
          </Footer>
        </Layout>
      </Layout> */}
    </Provider>
  );
}

export default MyApp;
