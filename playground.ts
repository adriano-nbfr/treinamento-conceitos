import { Observable } from "rxjs";

console.log('Código síncrono no início');

const o = new Observable((subscriber) => {
  console.log('Observable iniciado');
  subscriber.next('Valor 1 emitido imediatamente');
  subscriber.next('Valor 2 emitido imediatamente');

  setTimeout(() => {
    // subscriber.error(Error('Ocorreu um erro'));
    subscriber.next('Valor 3 emitido com atraso');
    subscriber.complete();
  }, 2000);
});

// o.subscribe((valor) => console.log(valor));
const subs = o.subscribe({
  next: (valor) => console.log(valor),
  error: (error) => console.log(error),
  complete: () => console.log('Completou 1!')
});

// subs.unsubscribe();

console.log('Código síncrono no fim');