module.exports = {
  event: () => {
    let ev = (data) => {
      for (let listeners = ev[0], i = 0; i < listeners.length; i++)
        listeners[i](data)
    }
    ev[0] = []
    return ev
  },
  listen: (ev, fn) => (
    ev[0].indexOf(fn) < 0 && (ev[0] = ev[0].concat(fn)),
    () => {
      ev[0] = ev[0].filter(f => f !== fn)
    }
  )
}