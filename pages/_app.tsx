import React from "react";

import Background from "../components/layouts/Background";
import Hero from "../components/layouts/Hero";

import '../assets/sass/main.scss';

export default function App({ Component, pageProps }): JSX.Element {

    return (<div>
        <Background />
        <div className="container zk-container">
            <Hero />
            <Component {...pageProps} />
        </div>
    </div>)
}
