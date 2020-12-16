import React from "react";
import Background from "../components/layouts/Background";

import '../assets/sass/main.scss';

export default function App({ Component, pageProps }): JSX.Element {
    return (<div>
        <Background />
        <Component {...pageProps} />
    </div>)
}
