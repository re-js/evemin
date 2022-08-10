# evemin

[![npm version](https://img.shields.io/npm/v/evemin?style=flat-square)](https://www.npmjs.com/package/evemin) [![npm bundle size](https://img.shields.io/bundlephobia/minzip/evemin?style=flat-square)](https://bundlephobia.com/result?p=evemin)

Modern and flazing fast event emitter

- Zero-cost abstraction
- High performant
- Lightweight

```javascript
import { event, listen } from 'evemin';

const onStart = event();

listen(onStart, (v) => console.log('start', v));

onStart(1); // developer console output: start 1
```

Installation

```bash
npm install evemin
```

Enjoy your code!