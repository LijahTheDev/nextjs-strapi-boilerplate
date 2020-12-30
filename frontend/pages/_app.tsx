import React from "react";
import { AppProps } from "next/app";
import Head from "next/head";
import { Provider as NextAuthProvider } from "next-auth/client";
import '../styles/globals.css'

const App = ({ Component, pageProps }: AppProps) => {
  const { session } = pageProps;

  return (
    <>
      <Head>
        <link rel="shortcut icon" href="/images/favicon.ico" />
      </Head>
      <NextAuthProvider session={session}>
        <Component {...pageProps} />
      </NextAuthProvider>
    </>
  );
};

export default App;
