import "antd/dist/antd.css";
import { AppProps } from "next/app";
import { Layout } from "antd";
import { Provider, useSession } from "next-auth/client";
import { ContextWrapper } from "context/ContextWrapper";

const { Header, Content, Footer } = Layout;

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider session={pageProps.session}>
      <ContextWrapper>
        <Component {...pageProps} />
      </ContextWrapper>
    </Provider>
  );
}

export default MyApp;
