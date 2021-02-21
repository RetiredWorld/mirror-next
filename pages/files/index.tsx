import React, { FC } from 'react';

import IndexGrid from '~components/index-item';
import { IDirsAPI, IndexMirrorAPI } from '~api';
import Title from '~components/title';

const Index: FC<{data: IDirsAPI}> = ({ data }) => {
    return (<>
        <Title title={`镜像列表`} />
        <IndexGrid items={data.data} />
    </>);
};

export default Index;

export const getServerSideProps = async () => {
    const data: IDirsAPI = await IndexMirrorAPI();
    return {
        props: {
            data,
        },
    };
};
