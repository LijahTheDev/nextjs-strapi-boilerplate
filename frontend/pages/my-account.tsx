import React from "react";
import Head from "next/head";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { getSession } from "next-auth/client";

const MyAccountPage: InferGetServerSidePropsType<typeof getServerSideProps> = ({
  session,
}) => {
  if (!session) {
    return <>No Session</>;
  }

  return (
    <>
      <Head>
        <title>My Account Page</title>
      </Head>
        My Account Page
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const session = await getSession({ req });

  return {
    props: {
      session,
    },
  };
};

export default MyAccountPage;
