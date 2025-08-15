import { InjectionToken } from "@angular/core";

export const RAIZ_API = new InjectionToken<string>('raiz_api');
// export const RAIZ_API = new InjectionToken<string>('raiz_api', {factory: () => '/api'});