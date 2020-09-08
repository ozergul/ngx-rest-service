import { InjectionToken } from '@angular/core';

export interface GlobalConfig {
  apiBaseUrl: string;
}

export const REST_CONFIG = new InjectionToken<GlobalConfig>('RestConfig');
