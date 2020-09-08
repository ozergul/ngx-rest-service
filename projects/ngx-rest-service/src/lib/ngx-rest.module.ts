import { ModuleWithProviders, NgModule } from '@angular/core';
import { GlobalConfig, REST_CONFIG } from './ngx-rest.config';

@NgModule()
export class NgxRestModule {
  static forRoot(config: Partial<GlobalConfig> = {}): ModuleWithProviders<NgxRestModule> {
    return {
      ngModule: NgxRestModule,
      providers: [
        {
          provide: REST_CONFIG,
          useValue: {
            config,
          },
        },
      ],
    };
  }
}
