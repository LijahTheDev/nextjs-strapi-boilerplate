import React from "react";
import Head from "next/head";
import { NextPage } from "next";

interface iProps {
  statusCode: number;
}

const Error: NextPage<iProps> = ({ statusCode }) => {
  return (
    <>
      <Head>
        <title>Error Page</title>
      </Head>
      Error: {statusCode}
    </>
  );
};

Error.getInitialProps = ({ res, err }) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;

  return { statusCode };
};

export default Error;
