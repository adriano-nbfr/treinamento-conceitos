import { inject, Injectable, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router } from '@angular/router';
import { filter } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Navegacao {

  private router = inject(Router);

  private navegando = signal(false);

  readonly isNavegando = this.navegando.asReadonly();


  constructor() {
    this.monitorarEventosDeNavegacao();
  }


  private monitorarEventosDeNavegacao() {
    this.router.events
      .pipe(
        filter(event =>
          event instanceof NavigationStart ||
          event instanceof NavigationEnd ||
          event instanceof NavigationCancel ||
          event instanceof NavigationError
        ),
        takeUntilDestroyed() // garante o unsubscribe automático quando este service for destruído
      )
      .subscribe(event => {
        if (event instanceof NavigationStart) {
          this.navegando.set(true);
        }
        else {
          this.navegando.set(false);
        }
      });
  }

}
