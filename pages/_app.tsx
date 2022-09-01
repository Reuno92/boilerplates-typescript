import '../styles/globals.scss';
import type { AppProps } from 'next/app';
import Header from '../component/template/Header';
import Footer from '../component/template/Footer';

/* eslint-disable react/jsx-props-no-spreading */
function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Header />
      <div
        id="wrapper"
        className="bg-main-gradient pt-3 main-height">
        <Component {...pageProps} />
      </div>
      <Footer />
    </>
  );
}

export default MyApp;
