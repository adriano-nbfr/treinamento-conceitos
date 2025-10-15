import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { provideHttpClient } from '@angular/common/http';
import { routes } from './app.routes';
import { provideRaizApi } from './shared/providers/raiz-api';
import { EstrategiaPaginacao } from './shared/rest/estrategia-paginacao';
import { EstrategiaPaginacaoJsonServer } from './shared/rest/estrategia-paginacao-json-server';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(),
    provideRaizApi('/api'),
    { provide: EstrategiaPaginacao, useClass: EstrategiaPaginacaoJsonServer }
  ]
};
