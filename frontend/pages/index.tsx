import React from "react";
import Head from "next/head";
import { NextPage } from "next";
import { useSession, signIn, signOut, getSession } from 'next-auth/client'
import Navbar from "components/Navbar";
import Feed from "components/Feed";
import axios, { AxiosResponse } from 'axios'

type Feed = {
  id: number;
  body: string;
  author: object;
  created_at: string;
  updated_at: string;
}

interface IndexProps {
  feeds: Feed[] | null;
  error: ResponseError | null;
}

interface ResponseError {
  statusCode: number;
  error: string;
  message: string;
}

export async function getServerSideProps(context) {
  let res: AxiosResponse<Feed[]> = null;
  const session = await getSession(context)

  try {
    if (session) {
      res = await axios.get<Feed[]>('http://localhost:1337/feeds', {
        headers: {
          Authorization: `Bearer ${session.jwt}`
        }
      });
    }
    else {
      res = await axios.get<Feed[]>('http://localhost:1337/feeds');
    }

    return {
      props: {
        feeds: res.data,
        error: null
      },
    }
  } catch (error) {
    console.log(error.response.data)

    return {
      props: {
        feeds: null,
        error: error.response.data
      },
    }
  }
}

const IndexPage: NextPage<IndexProps> = ({ feeds, error }: IndexProps) => {
  const [session] = useSession()

  return (
    <>
      <Head>
        <title>Index Page</title>
      </Head>
      <Navbar />
      <main className="flex justify-center items-center flex-col mt-8">
        <h1 className="text-2xl">Home Page</h1>
        {session ? 'Session' : 'No Session'}
        <br />
        {
          error
            ? <div>{error.statusCode} - {error.error} ({error.message})</div>
            : null

        }
        {
          session && feeds && (
            <div>
              {feeds.map(f => <p>{JSON.stringify(f)}</p>)}
            </div>
          )
        }

        {
          session
            ? (
              <>
                <button
                  type="button"
                  onClick={() => signOut({ callbackUrl: 'http://localhost:3000' })}
                  className="border border-indigo-500 bg-indigo-500 text-white rounded-md px-6 py-2 m-2 transition duration-500 ease select-none hover:bg-indigo-600 focus:outline-none focus:shadow-outline"
                >
                  Sign Out
                </button>

                <Feed />
              </>
            )
            : (
              <button
                type="button"
                onClick={() => signIn('google')}
                className="border border-indigo-500 bg-indigo-500 text-white rounded-md px-6 py-2 m-2 transition duration-500 ease select-none hover:bg-indigo-600 focus:outline-none focus:shadow-outline"
              >
                Sign In With Google
              </button>
            )

        }


      </main>
    </>
  );
};

export default IndexPage;
