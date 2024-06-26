import type { AppProps } from "next/app";
import { ToastContainer } from "react-toastify";
import { store, persistor } from '@/redux/store';
import { Provider } from 'react-redux';
import { PersistGate } from "redux-persist/integration/react";
import 'react-toastify/dist/ReactToastify.css';
import "@/styles/globals.scss";


export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ToastContainer />
        <Component {...pageProps} />
      </PersistGate>
    </Provider>
  );
}
