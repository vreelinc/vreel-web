import "@sass/main.scss";
import Head from "next/head";
import { AppProps } from "next/app";
import { Provider } from "react-redux";
import { store } from "../redux/store/store";
import { ApolloProvider } from "@apollo/client";
import { client } from "../components/graphql";
import GeneralMenu from "../components/Shared/Menu/GeneralMenu/GeneralMenu";
import AccountMenu from "../components/Shared/Menu/AccountMenu/AccountMenu";
import { CookiesProvider } from "react-cookie";
import ToastNotification from "src/components/common/Toast/ToastNotification/ToastNotification";
import QR from "src/components/Shared/QR";
import AuthProvider from "src/components/WithAuth/AuthProvider";
import Share from "src/components/Shared/Share";
import Info from "src/components/Shared/BottomSheet/Info";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>VReel</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <CookiesProvider>
        <ApolloProvider client={client}>
          <Provider store={store}>
            <AuthProvider>
              <GeneralMenu />
              <AccountMenu />
              <ToastNotification />
              <QR />
              <Share />
              <Info />
              <Component {...pageProps} />
            </AuthProvider>
          </Provider>
        </ApolloProvider>
      </CookiesProvider>
    </>
  );
}

export default MyApp;
