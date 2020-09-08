import { restClientParameterBuilder } from './rest.helpers';
import { RestService } from './rest.service';
import { eHTTP } from './rest.symbols';

export const Body = restClientParameterBuilder('Body')('Body');
export const Desc = restClientParameterBuilder('Desc')('Desc');
export const Query = restClientParameterBuilder('Query');
export const QueryMap = restClientParameterBuilder('QueryMap')('QueryMap');
export const Path = restClientParameterBuilder('Path');
export const Params = restClientParameterBuilder('Params');
export const ParamsMap = restClientParameterBuilder('ParamsMap')('ParamsMap');

export const Header = restClientParameterBuilder('Header');

export function WithCredentials() {
  return function (target: RestService, propertyKey: string, descriptor: any) {
    descriptor.withCredentials = true;
    return descriptor;
  };
}

export function Headers(headers: { [name: string]: string | string[] }) {
  return function (target: RestService, propertyKey: string, descriptor: any) {
    descriptor.headers = headers;
    return descriptor;
  };
}

export function ResponseType(responseType: eHTTP.ResponseType) {
  return function (target: RestService, propertyKey: string, descriptor: any) {
    descriptor.responseType = responseType;
    return descriptor;
  };
}
