import "antd/dist/antd.css";
import { AppProps } from "next/app";
import { Provider } from "next-auth/client";
import { ContextWrapper } from "context/ContextWrapper";
import { Wrapper } from "components/Layout/wrapper";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider session={pageProps.session}>
      <ContextWrapper>
        <Wrapper>
          <Component {...pageProps} />
        </Wrapper>
      </ContextWrapper>
    </Provider>
  );
}

export default MyApp;
