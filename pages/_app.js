import { Provider } from 'next-auth/client';
import '../styles/globals.css';
import AppWrapper from './state.js';

export default function MyApp({ Component, pageProps }) {
  return (
    <Provider session={pageProps.session}>
      <AppWrapper {...pageProps}>
        <Component {...pageProps} />
      </AppWrapper>
    </Provider>
  );
}
