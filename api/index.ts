import { getDirAPIPath, getIndexPath, IRouteQuery } from '~api/path-resolver';

interface IObj {
  name: string
  type: 'file' | 'directory'
  mtime: string
}

export interface IFile extends IObj {
  type: 'file'
  size: number
}

export interface IDir extends IObj {
  type: 'directory'
}

export type IDirsSingle = IFile | IDir;

export type IDirs = IDirsSingle[];

interface IAPIBasic {
  data: any
  code: number
}

export interface IDirsAPI extends IAPIBasic {
  data: IDirs
}

export const IndexMirrorAPI = async () => {
  const reqPath = getIndexPath();
  try {
    const data = await fetch(reqPath);
    if (data.status === 404) {
      return {
        data: [],
        code: 404,
      };
    }
    const dataJSON: IDirs = await data.json();
    return {
      data: dataJSON,
      code: 200,
    };
  } catch (e) {
    console.error(e);
    return {
      data: [],
      code: 500,
    };
  }
};

export const DirsMirrorAPI = async (route: IRouteQuery): Promise<IDirsAPI> => {
  const reqPath = getDirAPIPath(route);
  try {
    const data = await fetch(reqPath);
    if (data.status === 404) {
      return {
        data: [],
        code: 404,
      };
    }
    const dataJSON: IDirs = await data.json();
    return {
      data: dataJSON,
      code: 200,
    };
  } catch (e) {
    console.error(e);
    return {
      data: [],
      code: 500,
    };
  }
};
