import type { AppProps } from 'next/app';
import Header from '~/components/Header';
import Footer from '~/components/Footer';
import AuthenticationProvider from '~/providers/AuthenticationProvider';
import '~/styles/globals.css';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AuthenticationProvider>
      <div className="flex flex-col w-11/12 h-screen mx-auto mt-10 lg:w-7/12">
        <Header />
        <main className="mt-20">
          <Component {...pageProps} />
        </main>
        <Footer />
      </div>
    </AuthenticationProvider>
  );
}
