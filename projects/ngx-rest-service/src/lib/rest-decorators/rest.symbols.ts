import { HttpHeaders, HttpParams } from '@angular/common/http';

export interface DecoratorValue {
  key: string;
  parameterIndex: number;
}

export namespace Rest {
  export enum Method {
    GET = 'GET',
    HEAD = 'HEAD',
    POST = 'POST',
    PUT = 'PUT',
    PATCH = 'PATCH',
    DELETE = 'DELETE',
    CONNECT = 'CONNECT',
    TRACE = 'TRACE',
    OPTIONS = 'OPTIONS',
  }

  export interface Config {
    endpoint?: string;
    observe?: eHTTP.Observe;
    skipError?: boolean;
  }

  export interface Request<T = null> {
    body?: T;
    headers?:
      | HttpHeaders
      | {
          [header: string]: string | string[];
        };
    method: Method;
    params?:
      | HttpParams
      | {
          [param: string]: string | number | boolean | any[];
        };
    reportProgress?: boolean;
    responseType?: eHTTP.ResponseType;
    url: string;
    withCredentials?: boolean;
  }

  export interface Error {
    body: any;
    status: number;
    skipError?: boolean;
  }

  export type State = {
    errors: Error[];
  };
}

export namespace eHTTP {
  export enum Observe {
    Body = 'body',
    Events = 'events',
    Response = 'response',
  }

  export enum ResponseType {
    ArrayBuffer = 'arraybuffer',
    Blob = 'blob',
    JSON = 'json',
    Text = 'text',
  }
}
