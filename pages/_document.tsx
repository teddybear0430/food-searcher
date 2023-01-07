import { Html, Head, Main, NextScript } from 'next/document';
import Script from 'next/script';

export default function Document() {
  return (
    <Html lang="ja">
      <Head />
      <Script async src="https://www.googletagmanager.com/gtag/js?id=G-RXQM1E30LE" />
      <script
        dangerouslySetInnerHTML={{
          __html: `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-RXQM1E30LE');`,
        }}
      />
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
