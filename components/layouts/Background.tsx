import React, { useEffect } from "react";
import { StarBackground } from "../../vendors/star";


const Background = ():JSX.Element => {

    useEffect(()=>{
        const bg = new StarBackground()
        bg.start();
    }, []);

    return (<div id="zk-background" className="zk-background" >
        <canvas id="zk-star" className="zk-star" />
aa
        d
        <div className="zk-cover" />
    </div>);
}

export default Background;
