import { inject, Injectable, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router } from '@angular/router';
import { filter } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NavegacaoService {

  private router = inject(Router);

  private readonly navegando = signal(false);

  readonly isNavegando = this.navegando.asReadonly();


  constructor() {
    this.monitorarEventosDeNavegacao();
  }


  navegarPara(rota: string) {
    this.router.navigateByUrl(rota);
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
        } else if (
          event instanceof NavigationEnd ||
          event instanceof NavigationCancel ||
          event instanceof NavigationError
        ) {
          this.navegando.set(false);
        }
      });
  }

}
