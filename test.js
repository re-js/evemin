const tap = require('tap');
const { event, listen } = require('.');

const log = [];
const push = log.push.bind(log);
const assert_top = (v, offset = 0) => tap.equal(log.at(-1 + offset), v);


const ev = event();

listen(ev, push);

ev(10)
assert_top(10)

ev(10)
assert_top(10)

listen(ev, (v) => {
  if (v === 1) {
    const unlisten = listen(ev, (v) => {
      if (v === 2) unlisten();
      else push('nest')
    });
  }
});

ev(10)
assert_top(10)

ev(1)
assert_top(1)

ev(10) 
assert_top(10, -1)
assert_top('nest')

ev(2)
assert_top(2)

ev(10)
assert_top(10)
