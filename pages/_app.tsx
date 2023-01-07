import { Potta_One } from '@next/font/google';
import type { AppProps } from 'next/app';
import Header from '~/components/Header';
import Footer from '~/components/Footer';
import AuthenticationProvider from '~/providers/AuthenticationProvider';
import '~/styles/globals.css';

const logoFont = Potta_One({
  weight: '400',
  display: 'swap',
  subsets: ['japanese'],
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <style jsx global>{`
        .font-logo {
          font-family: ${logoFont.style.fontFamily}, ${logoFont.style.fontStyle};
        }
      `}</style>
      <AuthenticationProvider>
        <div className="flex flex-col h-full mx-auto w-11/12 lg:w-7/12">
          <Header />
          <main className="flex-1">
            <div className="mt-24">
              <Component {...pageProps} />
            </div>
          </main>
          <Footer />
        </div>
      </AuthenticationProvider>
    </>
  );
}
