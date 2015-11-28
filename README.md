# Deku timer component (higher-order)

> A deku higher-order timer component

Keep your components simple, testable and composable by using higher-order components.
This higher-order timer component will re-render your component at the desire rate (in milliseconds).


### Applications

- Countdowns (time remaining)
- Timers (time elapsed)
- Forcing updates / refresh of time-based contents

### Installation

```sh
npm install --save deku-timer
```

### Usage

Create a new component by wrapping your component with `timer` HOC. Alongside the properties you specify, the created component will receive a `tick` property, the specified `delay` value and a `stop` function.

```javascript
import element from 'virtual-element';
import { tree, render } from 'deku';

function myComponent({ tick, stop, delay }) {
    return element('div', {}, 'Started ' + tick * delay + 'ms ago.');
}

const Timer1 = timer(1000)({ render: myComponent });
const Timer2 = timer(2000)({ render: myComponent });

const app = tree(
    element('div', {}, [
        element(Timer1),
        element(Timer2)
    ])
);

render(app, document.body);
```
