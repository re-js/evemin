
const event = () => {
  return [
    'event',
    [], // subscribers
    // last one is the parent
  ]
}

const listen = (ev, fn) => {
  if (ev[1].indexOf(fn) !== -1) return; // return unsubscriber
  ev[1] = ev[1].concat(fn); // create new 
  // because it should be intependent from listeners run phase

  return; // return unsubscriber
}

const fire = (ev, data) => {
  const listeners = ev[1];
  for (let i = 0; i < listeners.length; i++) {
    listeners[i](data);
  }
}

