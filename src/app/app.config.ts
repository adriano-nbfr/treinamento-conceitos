import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { customInterceptor } from './shared/interceptors/custom-interceptor';
import { RAIZ_API } from './shared/providers/raiz-api';
import { EstrategiaPaginacao } from './shared/rest/estrategia-paginacao';
import { EstrategiaPaginacaoJsonServer } from './shared/rest/estrategia-paginacao-json-server';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideHttpClient(withInterceptors([customInterceptor])),
    provideRouter(routes, withComponentInputBinding()),
    { provide: RAIZ_API, useValue: '/api' },
    { provide: EstrategiaPaginacao, useClass: EstrategiaPaginacaoJsonServer }
  ]
};
