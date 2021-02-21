import React, { FC } from 'react';

import Search from '~components/global/search';

const Sidebar: FC = () => {
    const title = '<!--News-->';
    const title2 = '<!--Domain-->';
    const title3 = '<!--Mirrors-->';

    return (<>
    <div className="mirror-logo">
        <img src="/static/logo-white.svg" alt=""/>
    </div>
    <div className="mirror-title">
        <h1>科大镜像</h1>
    </div>
    <div className="mirror-side">
        <div className="mirror-search">
            <Search />
        </div>
        <div className="mirror-div">
            <div className="tt">
                {title}
            </div>
            <div className="ct">
                <ul>
                    <li>关于移除 nodesource 的通知</li>
                </ul>
            </div>
        </div>
        <div className="mirror-div">
            <div className="tt">
                {title2}
            </div>
            <div className="ct">
                <ul>
                    <li><a href="">自动解析</a></li>
                    <li><a href="">IPV4 线路</a></li>
                    <li><a href="">IPV6 线路</a></li>
                    <li><a href="">教育网线路</a></li>
                    <li><a href="">电信线路</a></li>
                    <li><a href="">联通线路</a></li>
                    <li><a href="">Rsync 线路</a></li>
                </ul>
            </div>
        </div>
        <div className="mirror-div">
            <div className="tt">
                {title3}
            </div>
            <div className="ct">
                <button className="button">获取安装镜像</button>
            </div>
        </div>
    </div>
    </>);
};

export default Sidebar;
