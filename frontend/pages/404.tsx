import React from "react";
import Head from "next/head";
import { NextPage } from "next";

const Custom404Page: NextPage = () => {
  return (
    <>
      <Head>
        <title>Error Page</title>
      </Head>
      404 Page
    </>
  );
};

export default Custom404Page;
