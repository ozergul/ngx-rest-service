import { HttpHeaders, HttpParams, HttpRequest } from '@angular/common/http';
import { RestService } from './rest.service';
import { DecoratorValue, eHTTP, Rest } from './rest.symbols';

export function restClientParameterBuilder(paramName: string) {
  return function (key: string) {
    return function (target: RestService, propertyKey: string | symbol, parameterIndex: number) {
      const metadataKey = `${String(propertyKey)}_${paramName}_parameters`;
      const value: DecoratorValue = {
        key,
        parameterIndex,
      };
      if (Array.isArray(target[metadataKey])) {
        target[metadataKey].push(value);
      } else {
        target[metadataKey] = [value];
      }
    };
  };
}

export const Req = (urlPath: string, method: Rest.Method, restConfig?: Partial<Rest.Config>) => (
  target: RestService,
  propertyKey: string,
  descriptor: any,
) => {
  const pBody: DecoratorValue[] = target[`${propertyKey}_Body_parameters`];
  const pDesc: DecoratorValue[] = target[`${propertyKey}_Desc_parameters`];
  const pQuery: DecoratorValue[] = target[`${propertyKey}_Query_parameters`];
  const pQueryMap: DecoratorValue[] = target[`${propertyKey}_QueryMap_parameters`];
  const pHeader: DecoratorValue[] = target[`${propertyKey}_Header_parameters`];
  const pPath: DecoratorValue[] = target[`${propertyKey}_Path_parameters`];
  const pParams: DecoratorValue[] = target[`${propertyKey}_Params_parameters`];
  const pParamsMap: DecoratorValue[] = target[`${propertyKey}_ParamsMap_parameters`];

  descriptor.value = function (this: RestService, ...args: any[]) {
    const body = extractMethodParameterValue(args, pBody);
    const params = extractParams(pParams, pParamsMap, args);
    const headers = extractHeaders(descriptor, pHeader, args);
    const responseType = extractResponseType(descriptor);
    const url: string = extractUrl(urlPath, pPath, pQuery, pQueryMap, args);

    const config = {
      endpoint: 'api',
      observe: eHTTP.Observe.Body,
      skipError: false,
      ...restConfig,
    } as Rest.Config;
    const request: HttpRequest<any> | Rest.Request<any> = {
      ...(body && { body }),
      ...(responseType && { responseType }),
      method,
      url,
      headers,
      params,
      withCredentials: descriptor.withCredentials,
    };

    return this.request(request, config);
  };

  return descriptor;
};

export const Get = (urlPath: string, restConfig?: Partial<Rest.Config>) =>
  Req.call(this, urlPath, Rest.Method.GET, restConfig);

export const Post = (urlPath: string, restConfig?: Partial<Rest.Config>) =>
  Req.call(this, urlPath, Rest.Method.POST, restConfig);

export const Head = (urlPath: string, restConfig?: Partial<Rest.Config>) =>
  Req.call(this, urlPath, Rest.Method.HEAD, restConfig);

export const Put = (urlPath: string, restConfig?: Partial<Rest.Config>) =>
  Req.call(this, urlPath, Rest.Method.PUT, restConfig);

export const Patch = (urlPath: string, restConfig?: Partial<Rest.Config>) =>
  Req.call(this, urlPath, Rest.Method.PATCH, restConfig);

export const Delete = (urlPath: string, restConfig?: Partial<Rest.Config>) =>
  Req.call(this, urlPath, Rest.Method.DELETE, restConfig);

export const Connect = (urlPath: string, restConfig?: Partial<Rest.Config>) =>
  Req.call(this, urlPath, Rest.Method.CONNECT, restConfig);

export const Trace = (urlPath: string, restConfig?: Partial<Rest.Config>) =>
  Req.call(this, urlPath, Rest.Method.TRACE, restConfig);

export const Options = (urlPath: string, restConfig?: Partial<Rest.Config>) =>
  Req.call(this, urlPath, Rest.Method.OPTIONS, restConfig);

function extractUrl(
  url: string,
  pPath: DecoratorValue[],
  pQuery: DecoratorValue[],
  pQueryMap: DecoratorValue[],
  args: any[],
) {
  let resUrl = url;
  if (pPath) {
    resUrl = extractPath(resUrl, pPath, args);
  }

  if (pQuery) {
    resUrl = extractQuery(resUrl, pQuery, args);
  }

  if (pQueryMap) {
    resUrl = extractQueryMap(resUrl, args, pQueryMap);
  }
  return resUrl.charAt(resUrl.length - 1) === '/' ? resUrl.substring(0, resUrl.length - 1) : resUrl;
}

function extractQueryMap(resUrl: string, args: any[], pQueryMap: DecoratorValue[]) {
  resUrl = resUrl.includes('?') ? resUrl : `${resUrl}?`;
  const value = extractMethodParameterValue(args, pQueryMap) as Object;
  resUrl = Object.keys(value).reduce((acc, key) => acc + `${key}=${value[key]}&`, resUrl);
  resUrl = resUrl.substring(0, resUrl.length - 1);
  return resUrl;
}

function extractQuery(resUrl: string, pQuery: DecoratorValue[], args: any[]) {
  resUrl = resUrl.includes('?') ? resUrl : `${resUrl}?`;
  pQuery
    .filter((p) => args[p.parameterIndex] !== null && args[p.parameterIndex] !== undefined) // filter out optional parameters
    .forEach(({ key, parameterIndex }) => {
      let value = args[parameterIndex];
      // if the value is a instance of Object, we stringify it
      if (value instanceof Object) {
        value = JSON.stringify(value);
      }
      resUrl += `${key}=${value}&`;
    });
  resUrl = resUrl.substring(0, resUrl.length - 1);
  return resUrl;
}

function extractParams(pParams: DecoratorValue[], pParamsMap: DecoratorValue[], args: any[]) {
  let params = new HttpParams();
  if (pParams) {
    pParams
      .filter((p) => args[p.parameterIndex]) // filter out optional parameters
      .forEach(({ key, parameterIndex }) => {
        let value = args[parameterIndex];
        // if the value is a instance of Object, we stringify it
        if (value instanceof Object) {
          value = JSON.stringify(value);
        }
        if (value) {
          params = params.set(key, value);
        }
      });
  }
  if (pParamsMap) {
    const value = extractMethodParameterValue(args, pParamsMap) as Object;
    Object.keys(value)
      .filter((key) => value[key])
      .forEach((key) => (params = params.set(key, value[key])));
  }
  return params;
}

function extractHeaders(descriptor: any, pHeader: DecoratorValue[], args: any[]) {
  let headers = new HttpHeaders();
  // set method specific headers
  if (descriptor.headers) {
    Object.keys(descriptor.headers).forEach((key) => (headers = headers.set(key, descriptor.headers[key])));
  }

  // set parameter specific headers
  if (pHeader) {
    pHeader.forEach(({ key, parameterIndex }) => (headers = headers.set(key, args[parameterIndex])));
  }
  return headers;
}

function extractResponseType(descriptor: any) {
  if (descriptor.responseType) {
    return descriptor.responseType;
  }
  return null;
}

function extractPath(resUrl: string, pPath: DecoratorValue[], args: any[]) {
  return pPath.reduce((acc, { key, parameterIndex }) => urlBuilder(acc, { [key]: args[parameterIndex] }), resUrl);
}

function extractMethodParameterValue(
  args: any[],
  decorator: { key: string; parameterIndex: number }[],
  index: number = 0,
) {
  return decorator && args[decorator[index].parameterIndex];
}

function urlBuilder(url = '', options = {}) {
  return Object.keys(options).reduce(
    (acc, key) => (acc = acc.replace(new RegExp(`{\\s*${key}\\s*}`, 'g'), options[key])),
    url,
  );
}
