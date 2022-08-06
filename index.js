
const 
  event = () => {
    const ent = () => {};
    return ent
  },
  fire = (fn, v) => fn(v),
  map = () => {},
  filter = () => {},
  readonly = () => {},
  listen = () => {};

listen.once = () => {};

module.exports = {
  event,
  fire,
  map,
  filter,
  readonly,
  listen
}