import { Provider } from 'next-auth/client';
import '../styles/globals.css';
import AppWrapper from './state.js';
// import 'bootstrap/dist/css/bootstrap.css'

export default function MyApp({ Component, pageProps }) {
  return (
    <Provider session={pageProps.session}>
      <AppWrapper {...pageProps}>
        <Component {...pageProps} />
      </AppWrapper>
    </Provider>
  );
}
