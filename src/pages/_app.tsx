import "@sass/main.scss";
import Head from "next/head";
import { AppProps } from "next/app";
import { Provider } from "react-redux";
import { CookiesProvider } from "react-cookie";
import { ApolloProvider } from "@apollo/client";
import { client } from "../services/graphql";

import { store } from "@redux/store/store";
import AuthProvider from "@auth/SecureRoute/AuthProvider";
import GeneralMenu from "@shared/Menu/GeneralMenu/GeneralMenu";
import AccountMenu from "@shared/Menu/AccountMenu/AccountMenu";
import ToastNotification from "@shared/ToastNotification/ToastNotification";
import QR from "@sections/Sliders/HeroSlider/HelperComps/QR";
import Share from "@sections/Sliders/HeroSlider/HelperComps/Share";
import Info from "@sections/Sliders/HeroSlider/HelperComps/Info";

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
              {/* <Info /> */}
              <Component {...pageProps} />
            </AuthProvider>
          </Provider>
        </ApolloProvider>
      </CookiesProvider>
    </>
  );
}

export default MyApp;
