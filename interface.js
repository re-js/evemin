
const event = () => {
  const ev = (data) => {
    const listeners = ev[1];
    for (let i = 0; i < listeners.length; i++) {
      listeners[i](data);
    }
  }
  
  ev[0] = 'event'; // identificator
  ev[1] = []; // listeners
  // ev[2] = void 0; // parent

  return ev;
}

const listen = (ev, fn) => {
  if (ev[1].indexOf(fn) === -1) {
    ev[1] = ev[1].concat(fn); // create new 
    // because it should be intependent from listeners run phase
  }
  return () => {
    ev[1] = ev[1].filter(f => f !== fn);
  }
}


module.exports = {
  event,
  listen
}