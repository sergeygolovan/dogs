import React, {FC} from 'react';
import {AppProps} from 'next/app';
import { Provider } from 'react-redux';
import { store, wrapper } from '../store';

const WrappedApp: FC<AppProps> = ({Component, pageProps}) => (
    // <Provider store={store}>
      <Component {...pageProps} />
    // </Provider>
);

export default wrapper.withRedux(WrappedApp);
