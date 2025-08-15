import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { logInterceptor } from './shared/interceptors/log-interceptor';
import { RAIZ_API } from './shared/providers/raiz-api';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideHttpClient(withInterceptors([logInterceptor])),
    provideRouter(routes),
    { provide: RAIZ_API, useValue: '/api' }
  ]
};
