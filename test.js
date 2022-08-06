const { performance } = require('perf_hooks');

let counter = 0;

const strategies = [];

///

const listeners_array = Array.from(Array(10)).map(() => (v) => {
  counter += v;
});

strategies[0] = (v) => {
  for (const fn of listeners_array) {
    fn(v)
  }
}

strategies[1] = (v) => {
  listeners_array.forEach(fn => fn(v));
}

///

const listeners_set = new Set(listeners_array);

strategies[2] = (v) => {
  for (const fn of listeners_set) {
    fn(v)
  }
}

strategies[3] = (v) => {
  listeners_set.forEach(fn => fn(v));
}

///

let top_fn = listeners_array[0];

listeners_array.slice(1).forEach(listener => {
  const stack = top_fn;
  top_fn = (v) => (listener(v), stack(v));
})

strategies[4] = top_fn;


/// TEST

const EVENTS = 1000000;

const times = strategies.map(() => []);

const run_all = (n) => {
  for (let i = 0; i < n; i++) {
    // console.log('All strategies start', i, 'iteration')
    strategies.forEach((strategy, i) => {
      // console.log('Strategy', i, 'start');
      const time = performance.now();
      for (let i = 0; i < EVENTS; i++) {
        strategy(1);
      }
      times[i].push(
        performance.now() - time
      )
    });
  }
}

run_all(10);

times.forEach((times, i) => {

  let label;
  switch (i) {
    case 0: label = 'for of array'; break;
    case 1: label = 'array.forEach'; break;
    case 2: label = 'for of set'; break;
    case 3: label = 'set.forEach'; break;
    case 4: label = 'top_fn'; break;
  }

  console.log(label);
  console.log(
    ...times.map(v => `\t${Math.round(v * 100) / 100}`)
  )

});
console.log(counter);
