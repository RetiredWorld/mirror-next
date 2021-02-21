import React, { FC } from 'react';

interface ITitleProps {
    title: string
}

const Title: FC<ITitleProps> = ({ title }) => {
    return (<>
        <h1 className="mirror-title">{ title }</h1>
    </>);
};

export default Title;
