[![npm version](https://badge.fury.io/js/deku-timer.svg)](https://badge.fury.io/js/deku-timer)
[![Build Status](https://travis-ci.org/troch/deku-timer.svg?branch=master)](https://travis-ci.org/troch/deku-timer)

# Deku timer component (higher-order)

> A deku higher-order timer component

Keep your components simple, testable and composable by using higher-order components.
This higher-order timer component will re-render your component at the desire rate (in milliseconds).

This higher-order component takes care of when to call render on your component, so your component has only to care about the rendering logic.

> A higher-order component is just a function that takes an existing component and returns another component that wraps it.

Read about higher-order components here (applies to deku as well): [Mixins Are Dead. Long Live Composition](https://medium.com/@dan_abramov/mixins-are-dead-long-live-higher-order-components-94a0d2f9e750#.c8wftb16t).

__Demo:__ http://requirebin.com/?gist=752d87b73f7d607ccbf9

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
