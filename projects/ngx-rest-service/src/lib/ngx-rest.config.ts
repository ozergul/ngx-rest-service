import { InjectionToken } from '@angular/core';

export interface GlobalConfig {
  apiBaseUrl: string;
}

export interface RestToken {
  default: GlobalConfig;
  config: Partial<GlobalConfig>;
}

export const REST_CONFIG = new InjectionToken<RestToken>('RestConfig');
