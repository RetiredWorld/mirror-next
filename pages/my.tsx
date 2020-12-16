import Link from 'next/link'
import React from "react";

export default function my() {
    return (<h1><Link href="/">
        <a className="test"><div className="test-div">
            aaa
        </div></a>
    </Link></h1>)
}
