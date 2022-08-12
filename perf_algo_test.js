const { performance } = require('perf_hooks');


/*

➜  evemin git:(main) ✗ node perf_algo_test.js
origin
	87.53 	105.24 	106.76 	105.22 	104.91 	103.82 	104.55 	104.74 	104.72 	104.75
modified
	158.49 	159.25 	157.6 	156.54 	157.11 	156.58 	156.76 	157.47 	156.16 	157.14
600000000
➜  evemin git:(main) ✗ bun run perf_algo_test.js
origin
	56.84 	52.23 	69.22 	52.34 	50.9 	52.03 	51.47 	52.82 	51.62 	52.58
modified
	98.65 	123.16 	97.3 	97.64 	98.09 	98.2 	99.02 	98.56 	98.6 	97.76
600000000

*/



const { event: event_1, listen: listen_1 } = require('./index');

const { event: event_2, listen: listen_2 } = {
  event: () => {
    let ev = (data) => {
      ev[1] ++;
      try {
          for (ev[3] = 0; ev[3] < ev[0].length; ev[3]++)
            ev[0][ev[3]](data)
      }
      finally {
          ev[1]--;
          if (!ev[1] && ev[2].length) {
            ev[0] = ev[0].concat(ev[2]);
            ev[2].length = 0;
          }
      }
    }
    ev[0] = []
    ev[1] = 0 // listen phase
    ev[2] = [] // new listeners
    ev[3] = 0 // current iteration index
    return ev
  },
  listen: (ev, fn) => (
    ev[0].indexOf(fn) < 0 && (ev[1] ? (ev[2].indexOf(fn) < 0 && ev[2].push(fn)) : ev[0].push(fn)),
    () => {
      let i = ev[0].indexOf(fn)
      i > -1 && (ev[1] && i <= ev[3] && ev[3]--, ev[0].splice(i, 1))
      i = ev[2].indexOf(fn)
      i > -1 && ev[2].splice(i, 1)
    }
  )
}




let counter = 0;

const LISTENERS = 3;

const events = [
  event_1(),
  event_2()
]

Array.from(Array(LISTENERS)).forEach(() => {
  listen_1(events[0], (v) => {
    counter += v;
  })
  listen_2(events[1], (v) => {
    counter += v;
  })
});



/// TEST

const EVENTS = 10000000;

const times = events.map(() => []);

const run_all = (n) => {
  for (let i = 0; i < n; i++) {
    // console.log('All strategies start', i, 'iteration')
    events.forEach((event, i) => {
      if (!event) return;

      // console.log('Strategy', i, 'start');
      const time = performance.now();
      for (let i = 0; i < EVENTS; i++) {
        event(1);
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
    case 0: label = 'origin'; break;
    case 1: label = 'modified'; break;
  }

  console.log(label);
  console.log(
    ...times.map(v => `\t${Math.round(v * 100) / 100}`)
  )

});
console.log(counter);
