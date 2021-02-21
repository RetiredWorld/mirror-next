import path from 'path';
import getConfig from 'next/config';

interface IPathConfig {
  publicRuntimeConfig: {
    baseUrlPath: string
    baseDirPath: string
    fileBasePath: string
    dirBasePath: string
  }
}

const { publicRuntimeConfig: config } = getConfig() as IPathConfig;

export interface IRouteQuery {
  query?: {
    path?: string[]
  }
}

type RouteType = 'url' | 'full' | 'name'

const getRouteQuery = (route: IRouteQuery): string[] => {
  const query = route.query;
  if (query) {
    if (query.path) return query.path;
  }
  return [ '' ];
};

const concatUrl = (baseUrl: string, relPath: string): string => {
  if (baseUrl.endsWith('/') && relPath.startsWith('/')) {
    return baseUrl.substr(0, baseUrl.length - 1) + relPath;
  } else if (!baseUrl.endsWith('/') && !relPath.startsWith('/')) {
    return baseUrl + '/' + relPath;
  } else {
    return baseUrl + relPath;
  }
};

const getPath = (base: string, pathStr: string[]) => {
  const uri = encodeURI(path.join(...pathStr));
  return concatUrl(base, uri);
};

export const getFilePath = (route: IRouteQuery, filename = ''): string => {
  const routeQuery = getRouteQuery(route);
  const { baseUrlPath: basePath, fileBasePath } = config;

  return getPath(basePath, [ fileBasePath??'', ...routeQuery, filename??'' ]);
};

export const getDirPath = (route: IRouteQuery, dirname = '', type: RouteType = 'url'): string => {
  const routeQuery = getRouteQuery(route);
  const { baseDirPath: basePath, dirBasePath } = config;

  switch (type) {
    case 'name': {
      return dirname;
    }

    case 'full': {
      return path.join(dirBasePath??'', ...routeQuery, dirname);
    }

    case 'url': {
      return getPath(basePath, [ dirBasePath??'', ...routeQuery, dirname??'' ]);
    }
  }
};

export const getDirAPIPath = (route: IRouteQuery): string => {
  const routeQuery = getRouteQuery(route);
  const { baseUrlPath: basePath, fileBasePath } = config;

  return getPath(basePath, [ fileBasePath??'', ...routeQuery ]);
};

export const getPrevDirPath = (route: IRouteQuery, type: RouteType = 'url'): string => {
  const routeQuery = getRouteQuery(route);
  const { baseDirPath: basePath, dirBasePath } = config;
  switch (type) {
    case 'name': {
      if (routeQuery.length === 0) {
        return '';
      } else if (routeQuery.length === 1) {
        return dirBasePath;
      } else {
        return routeQuery[routeQuery.length - 2];
      }
    }
    case 'full': {
      return  path.join(dirBasePath??'', ...routeQuery.slice(0, routeQuery.length - 1));
    }
    case 'url': {
      return getPath(basePath, [ dirBasePath??'', ...routeQuery.slice(0, routeQuery.length - 1) ]);
    }
  }
};

export const getIndexPath = () => {
  return concatUrl(config.baseDirPath, 'static/mirrors.json');
};
