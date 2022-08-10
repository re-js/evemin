# evemin

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

```bash
npm install evemin
```

Enjoy your code!