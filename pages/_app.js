import {SessionProvider} from 'next-auth/react';
import {RecoilRoot} from 'recoil';
import '../styles/globals.css';

export default function App({Component, pageProps}) {
  return (
    <SessionProvider session={pageProps.session}>
      <RecoilRoot>
        <Component {...pageProps} />
      </RecoilRoot>
    </SessionProvider>
  );
}
