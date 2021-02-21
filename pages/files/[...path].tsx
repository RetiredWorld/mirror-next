import React, { FC } from 'react';

import Title from '~components/title';
import { DirsMirrorAPI, IDirsAPI } from '~api';
import IndexGrid from '~components/index-item';
import { getDirPath, IRouteQuery } from '~api/path-resolver';
import { useRouter } from '~node_modules/next/router';

const Index: FC<{data: IDirsAPI}> = ({ data }) => {
    const route = useRouter();
    const currentPath = getDirPath(route, '', 'full');
    return (<>
        <Title title={`Index of ${currentPath}`} />
        <IndexGrid items={data.data} hasPrev={true} />
    </>);
};

export default Index;

interface IProps extends IRouteQuery {
    params: {
        path: string
    }
}

export const getServerSideProps = async (context: IProps) => {
    const data: IDirsAPI = await DirsMirrorAPI(context);

    return {
        props: {
            data,
        },
    };
};
