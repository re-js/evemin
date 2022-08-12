# evemin

[![npm version](https://img.shields.io/npm/v/evemin?style=flat-square)](https://www.npmjs.com/package/evemin) [![npm bundle size](https://img.shields.io/bundlephobia/minzip/evemin?style=flat-square)](https://bundlephobia.com/result?p=evemin) [![code coverage](https://img.shields.io/coveralls/github/re-js/evemin?style=flat-square)](https://coveralls.io/github/re-js/evemin) [![typescript supported](https://img.shields.io/npm/types/typescript?style=flat-square)](index.d.ts)

Modern and blazing fast event emitter

- Zero-cost abstraction
- High performance
- Super small

🌈 2x times faster standard node.js event emitter

```javascript
import { event, listen } from 'evemin'

const onStart = event()

listen(onStart, (v) => console.log('start', v))

onStart(1) // developer console output: start 1
```

[![Try it on RunKit](https://badge.runkitcdn.com/>.svg)](https://runkit.com/betula/62f6253e0533460009786124)

Installation

```bash
npm install evemin
```

Enjoy your code!