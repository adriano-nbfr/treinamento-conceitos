import { interval, Observable } from "rxjs";

console.log('Código síncrono no início');

const o = new Observable((subscriber) => {
  console.log('Observable iniciado.');
  subscriber.next('Valor 1 emitido imediatamente');
  subscriber.next('Valor 2 emitido imediatamente');

  setTimeout(() => {
    subscriber.next('Valor 3 emitido com atraso');
    subscriber.complete();
  }, 2000);
  // subscriber.error(new Error('Ocorreu um erro'))
});

// o.subscribe((valor) => console.log(valor));
const subs = o.subscribe({
  next: (valor) => console.log(valor),
  error: (error) => console.log(error),
  complete: () => console.log('Completou 1')
});

const subs2 = interval(1000).subscribe({
  next: (valor) => console.log(valor),
  error: (error) => console.log(error),
  complete: () => console.log('Completou 2')
});

setTimeout(() => subs2.unsubscribe(), 5000);

console.log('Código síncrono no fim');




// const p = new Promise((resolve, reject) => {
//   console.log('Promise iniciada');
//   resolve('Valor 1');
//   // setTimeout(() => resolve('Valor retornado com atraso'), 2000);
//   // reject(new Error('Ocorreu um erro'))
// })

// p.then((valor) => console.log('Valor primeiro then:', valor))
// .catch((erro) => console.error(erro.message))
// .finally(() => console.log('Promise terminada'))

// p.then((valor) => console.log('Valor segundo then:', valor))