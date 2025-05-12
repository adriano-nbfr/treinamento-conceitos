import { HttpEvent, HttpEventType, HttpHandlerFn, HttpRequest } from "@angular/common/http";
import { Observable, tap } from "rxjs";

export function customInterceptor(
  req: HttpRequest<unknown>,
  next: HttpHandlerFn): Observable<HttpEvent<unknown>> {

  const newReq = req.clone({
    headers: req.headers.set('X-CUSTOM-HEADER', '123456789')
  });

  return next(newReq)
    .pipe(
      tap(event => {
        if (event.type === HttpEventType.Response) {
          console.log(req.url, 'Retornou com status:', event.status);
        }
      })
    );
}
