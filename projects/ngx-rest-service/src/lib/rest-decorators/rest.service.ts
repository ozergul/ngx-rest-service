import { HttpClient, HttpRequest } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { eHTTP, Rest } from './rest.symbols';
import { GlobalConfig, REST_CONFIG } from '../ngx-rest.config';

@Injectable({
  providedIn: 'root',
})
export class RestService {
  constructor(
    @Inject(REST_CONFIG) public restConfig: GlobalConfig,
    protected http: HttpClient) {}

  request<T, R>(request: HttpRequest<T> | Rest.Request<T>, config: Rest.Config) {
    const { method, url, ...options } = request;
    const { observe = eHTTP.Observe.Body } = config;
    const apiBaseUrl = this.restConfig.apiBaseUrl;
    return this.http.request<T>(method, apiBaseUrl + url, { ...options, observe } as any);
  }
}
