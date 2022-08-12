import { event, listen } from '.'
import { performance } from 'perf_hooks'
import EventEmitter from 'events'

let counter: number, events, stamp, time

//
// evemin events performance test
//

const evemin_events_test = () => {
  events = [0,1,2,3,4,5,6,7,8,9].map(() => {
    const ev = event<number>()
    listen(ev, (v) => counter+=v)
    listen(ev, (v) => counter+=v)
    return ev
  })
  
  counter = 0
  stamp = performance.now()
  for (let i = 0; i < 1000; i++) {
    for (let j = 0; j < 10; j++) {
      events[j](1)
    }
  }
  time = performance.now() - stamp
  
  console.log(`evemin events \t${counter} times per ${Math.round(time * 100) / 100}s`)
}

//
// plain javascript functions performance test
//

const plain_functions_test = () => {
  events = [0,1,2,3,4,5,6,7,8,9].map(() => {
    const fn_1 = (v: number) => counter+=v
    const fn_2 = (v: number) => counter+=v
    return (v: number) => {
      fn_1(v)
      fn_2(v)
    }
  })
  
  counter = 0
  stamp = performance.now()
  for (let i = 0; i < 1000; i++) {
    for (let j = 0; j < 10; j++) {
      events[j](1)
    }
  }
  time = performance.now() - stamp
  
  console.log(`js functions \t${counter} times per ${Math.round(time * 100) / 100}s`)  
}

//
// node event emitter performance test
//

const node_event_emitter_test = () => {
  const emitter = new EventEmitter();

  events = [0,1,2,3,4,5,6,7,8,9].map((n) => {
    const name = String(n)
    emitter.on(name, (v: number) => counter+=v)
    emitter.on(name, (v: number) => counter+=v)
    return name
  })
  
  counter = 0
  stamp = performance.now()
  for (let i = 0; i < 1000; i++) {
    for (let j = 0; j < 10; j++) {
      emitter.emit(events[j], 1)
    }
  }
  time = performance.now() - stamp
  
  console.log(`event emitter \t${counter} times per ${Math.round(time * 100) / 100}s`)  
}

//
// Run
//

console.log('plain functions test')

for (let i = 0; i < 10; i++) {
  plain_functions_test()
}

console.log('evemin events test')

for (let i = 0; i < 10; i++) {
  evemin_events_test()
}

console.log('node event emitter test')

for (let i = 0; i < 10; i++) {
  node_event_emitter_test()
}

//
// Result
//

/*
plain functions test
js functions 	  20000 times per 0.7s
js functions 	  20000 times per 0.23s
js functions 	  20000 times per 0.17s
js functions 	  20000 times per 0.17s
js functions 	  20000 times per 0.18s
js functions 	  20000 times per 0.18s
js functions 	  20000 times per 0.17s
js functions 	  20000 times per 0.18s
js functions 	  20000 times per 0.17s
js functions 	  20000 times per 0.18s

evemin events test
evemin events 	20000 times per 1.02s
evemin events 	20000 times per 0.4s
evemin events 	20000 times per 0.34s
evemin events 	20000 times per 0.27s
evemin events 	20000 times per 0.26s
evemin events 	20000 times per 0.26s
evemin events 	20000 times per 0.26s
evemin events 	20000 times per 0.26s
evemin events 	20000 times per 0.26s
evemin events 	20000 times per 0.27s

node event emitter test
event emitter 	20000 times per 4.93s
event emitter 	20000 times per 2.37s
event emitter 	20000 times per 0.52s
event emitter 	20000 times per 0.53s
event emitter 	20000 times per 0.53s
event emitter 	20000 times per 0.54s
event emitter 	20000 times per 0.53s
event emitter 	20000 times per 0.57s
event emitter 	20000 times per 0.55s
event emitter 	20000 times per 0.54s
*/
