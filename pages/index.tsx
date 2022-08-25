import type { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';

/* eslint-disable react/function-component-definition */
const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Next App Typescript Boilerplate</title>
        <meta
          name="description"
          content="Generated by create next app"
        />
        <link
          rel="icon"
          href="/favicon.ico"
        />
      </Head>

      <nav>
        <Link href="/about">
          <a>About</a>
        </Link>
      </nav>
      <main>
        <h1>Home Page</h1>
      </main>
      <footer>
        <p>Footer</p>
      </footer>
    </>
  );
};

export default Home;
