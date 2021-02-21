import React, { FC } from 'react';

import type { AppProps } from 'next/app';

import Sidebar from '~components/global/sidebar';
import Nav from '~components/global/nav';
import '~assets/sass/main.scss';

const App: FC<AppProps> = ({ Component, pageProps }) => {
  return (<div>
      <div className="mirror-page-wrapper container">
          <Nav />
          <div className="mirror-sidebar">
              <Sidebar />
          </div>
          <div className="mirror-cp">
              <Component {...pageProps} />
          </div>
      </div>
  </div>);
};

export default App;
