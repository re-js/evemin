const { performance } = require('perf_hooks');

/*
LISTENERS: 200, EVENTS = 100000; counter: 1600000000

node.js:

for of array        60.82   56.2 	  54.75 	54.65 	53.88 	54.93 	55.02 	54.89 	53.83 	55.12
array.forEach       62      55.68 	54.27 	54.64 	55.37 	55.1 	  54.24 	55.04 	55.68 	54.69
for of set          56.1    54.94 	56.14 	55.66 	54.65 	55.15 	55.7 	  55.78 	54.72 	55.42
set.forEach         152.21 	150.54 	148.34 	148.64 	150.01 	149.59 	148.88 	148.59 	149.59 	149.52
top_fn              200.21 	199.97 	199.11 	199.11 	199.44 	198.45 	199.53 	198.57 	199.47 	198.72
for with len        54.54 	53.81 	54.9 	  55.04 	53.62 	54.18 	55.01 	54.69 	53.71 	54.11
for                 55.78 	54.82 	53.97 	54.1 	  55.05 	55.17 	53.94 	54.16 	55.13 	55.44
set iterator while  60.01 	58.52 	59.45 	59.54 	58.48 	58.33 	59.46 	59.7 	  58.67 	58.43

bun:

for of array        51.15 	41.57 	42.46 	42.7 	  42.02 	41.88 	43.15 	41.8 	  41.45 	41.39
array.forEach       39.03 	35.45 	34.47 	35.14 	34.35 	35.01 	34.24 	34.33 	34.34 	34.2
for of set          50.38 	46.1 	  45.83 	48.84 	45.58 	46.97 	46.97 	47.25 	49.89 	46.47
set.forEach         40.89 	35.84 	33.92 	33.65 	32.99 	32.81 	33.3 	  32.8 	  32.76 	32.77
top_fn              67.11 	66.87 	66.39 	66.38 	66.98 	67.14 	67.54 	67.52 	67.48 	67.69
for with len        26.53 	26.14 	26.51 	26.87 	26.17 	25.63 	25.66 	25.59 	25.69 	25.63
for                 27.42 	26.55 	26.07 	25.76 	25.67 	25.58 	25.61 	25.62 	25.61 	25.56
set iterator while  37.77 	35.27 	35.27 	35.19 	35.17 	35.17 	35.43 	36.24 	36.21 	36.41


LISTENERS: 1000, EVENTS = 100000; counter: 8000000000

node.js:

for of array        281.16 	272.91 	271.89 	635.42 	607.72 	607.92 	613.38 	609.91 	608.8 	618.9
array.forEach       294.57 	274.06 	273.69 	632.54 	576.56 	576 	  587.31 	578.22 	575.67 	584.38
for of set          277.53 	275.34 	275.74 	791.61 	760.07 	763.35 	769.74 	766.06 	761.03 	775.6
set.forEach         737.75 	734.94 	735.43 	1235.51	1216.45	1209.97	1217.12	1214.57	1210.89	1233.91
top_fn              1139.93	1145.21	1141.63	1607.65	1558.54	1559.78	1578.83	1563.01	1575.11	1594.36
for with len        272.39 	269.92 	453.33 	589.81 	588.62 	588.36 	590.45 	588.87 	601.88 	589.23
for                 274.66 	272.08 	614.65 	584.39 	585.96 	582.53 	586.53 	591.51 	593.48 	583.67
set iterator while  289.76 	288.38 	881.46 	847.22 	848.17 	854.03 	853.24 	848.45 	859.48 	851.08

bun:

for of array        219.03 	205.36 	204.41 	445.19 	441.91 	442.32 	442.87 	443.91 	441.37 	441.03
array.forEach       173.3 	170.07 	169.63 	444.92 	442.07 	446.1 	442.81 	445.95 	441.81 	442.34
for of set          228.31 	223.59 	221.13 	444.18 	441.95 	441.07 	443.39 	443.35 	441.42 	442.03
set.forEach         164.55 	159.05 	160.13 	446.31 	441.93 	442.13 	444.31 	445.36 	441.53 	443.12
top_fn              496.36 	500.8 	496.82 	546.08 	543.26 	542.63 	546.26 	543.04 	540.58 	545.76
for with len        127.47 	125.35 	294.05 	444.58 	442.1 	443.17 	445.31 	442.65 	441.61 	447.12
for                 127.95 	126.96 	444.59 	442.8 	443.12 	442.67 	445.5 	442.23 	443.14 	443.65
set iterator while  176.61 	173.93 	445.76 	442.15 	442.22 	443.47 	449.06 	442.08 	441.22 	443.29

*/


let counter = 0;

const LISTENERS = 200;

const strategies = [];

///

const listeners_array = Array.from(Array(LISTENERS)).map(() => (v) => {
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

///

strategies[5] = (v) => {
  for (let i = 0; i < listeners_array.length; i++) {
    listeners_array[i](v);
  }
}

strategies[6] = (v) => {
  let len = listeners_array.length;
  for (let i = 0; i < len; i++) {
    listeners_array[i](v);
  }
}

///

strategies[7] = (v) => {
  const iter = listeners_set[Symbol.iterator]();
  let fn;
  while (fn = iter.next().value) {
    fn(v)
  }
}

/// TEST

const EVENTS = 100000;

const times = strategies.map(() => []);

const run_all = (n) => {
  for (let i = 0; i < n; i++) {
    // console.log('All strategies start', i, 'iteration')
    strategies.forEach((strategy, i) => {
      if (!strategy) return;

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
    case 5: label = 'for with len'; break;
    case 6: label = 'for'; break;
    case 7: label = 'set iterator while'; break;
  }

  console.log(label);
  console.log(
    ...times.map(v => `\t${Math.round(v * 100) / 100}`)
  )

});
console.log(counter);
