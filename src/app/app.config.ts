import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';

import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { routes } from './app.routes';
import { logInterceptor } from './shared/interceptors/log-interceptor';
import { RAIZ_API } from './shared/providers/raiz-api';
import { EstrategiaPaginacao } from './shared/rest/estrategia-paginacao';
import { EstrategiaPaginacaoJsonServer } from './shared/rest/estrategia-paginacao-json-server';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideHttpClient(withInterceptors([logInterceptor])),
    provideRouter(routes, withComponentInputBinding()),
    { provide: RAIZ_API, useValue: '/api' },
    { provide: EstrategiaPaginacao, useClass: EstrategiaPaginacaoJsonServer }
  ]
};
