import React, { FC } from 'react';

import Link from 'next/link';
import { useRouter } from 'next/router';

import { getDirPath, getFilePath, getPrevDirPath } from '~api/path-resolver';

import { IDirs } from '~api';

const dateParser = (dateStr: string): string => {
    try {
        const options: Intl.DateTimeFormatOptions = {
            month: '2-digit',
            day: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            hour12: false,
        };
        const dateObj = new Date(dateStr);
        return new Intl.DateTimeFormat('sv-SE', options).format(dateObj);
    } catch (_) {
        return '无可奉告';
    }
};

const getHumanFileSize = (fileSizeInBytes: number): string => {
    try {
        let i = -1;
        const byteUnits = [ ' kB', ' MB', ' GB', ' TB', 'PB', 'EB', 'ZB', 'YB' ];
        do {
            fileSizeInBytes = fileSizeInBytes / 1024;
            i++;
        } while (fileSizeInBytes > 1024);
        return Math.max(fileSizeInBytes, 0.1).toFixed(1) + byteUnits[i];
    } catch (e) {
        return '�';
    }
};

interface IIndexItemProps {
    type: string
    url: string
    name: string
    mtime: string
    size?: number
}

const IndexItem: FC<IIndexItemProps> = ({ type, url, name, mtime, size=null }) => {
    function getTimeEle(timeStr: string): JSX.Element {
        const timeFmt = dateParser(timeStr);
        return (<time dateTime={timeStr}>{timeFmt}</time>);
    }

    let itemEle: JSX.Element;
    switch (type) {
        case 'directory': {
            itemEle = (<tr title={name} className="mirror-item m-dir">
                <td><Link href={url}><a href={url}>{ name }</a></Link></td>
                <td align={'center'}>{getTimeEle(mtime)}</td>
                <td align={'center'}> - </td>
            </tr>);
            break;
        }
        default: {
            itemEle = (<tr title={name} className="mirror-item m-file">
                <td ><a href={url}>{ name }</a></td>
                <td align={'center'}>{getTimeEle(mtime)}</td>
                <td align={'center'}>{ getHumanFileSize(size) }</td>
            </tr>);
            break;
        }
    }
    return itemEle;
};

interface IIndexGridProps {
    items: IDirs
    hasPrev?: boolean
}

const IndexGrid: FC<IIndexGridProps> = ({ items , hasPrev = false }) =>{
    function processDirName(name: string): string {
        if (name.startsWith('/')) name = name.slice(1);
        if (!name.endsWith('/')) name += '/';
        return name;
    }

    const route = useRouter();
    const prevUrl = getPrevDirPath(route, 'url');
    const prevEle: JSX.Element = hasPrev?(<IndexItem name={'Parent Directory/'} mtime={'-'} type={'directory'} url={prevUrl} />):(<></>);

    return (<table className="mirror-grid">
        <thead>
        <tr className="mirror-head">
            <th>名称</th>
            <th align={'center'}>时间</th>
            <th align={'center'}>大小</th>
        </tr>
        </thead>
        <tbody>
            { prevEle }
            { items.map(item => {
                if (item.type === 'directory') {
                    return (<IndexItem mtime={item.mtime} type={item.type}  name={processDirName(item.name)} url={getDirPath(route, item.name)} key={item.name} />);
                } else {
                    return (<IndexItem mtime={item.mtime} size={item.size} type={item.type} name={item.name} url={getFilePath(route, item.name)} key={item.name} />);
                }
            }) }
        </tbody>
    </table>);
};

export { IndexItem };
export default IndexGrid;
