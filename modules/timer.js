import element from 'virtual-element';
import invariant from 'invariant';

const registry = {};

function timer(delay) {
    invariant(
        typeof delay === 'number' && delay > 0,
        '[react-timer-hoc] `delay` should be a number greater than 0.'
    );

    return function TimerHoc(TimedComponent) {
        const initialState = () => ({ tick: 0 });

        function afterMount(component, el, setState) {
            const { id, state } = component;
            registy[id] = {
                startTime: Date.now(),
                stopped: false
            };

            setTimeout(component);
        }

        function setTimeout(component, setState) {
            const { id, state } = component;
            const duration = delay - (registry[id].startTime - Date.now()) % delay;
            registy[id].timer = setTimeout(() => {
                setState({ tick: state.tick + 1 });
                if (!registy[id].stopped) setTimeout(component, setState);
            }, delay);
        }

        function stop(component) {
            const { id, state } = component;
            registy[id].stopped = true;
            clearTimeout(registy[id].timer);
        }

        function beforeUnmount(component) {
            stop(component);
        }

        function render(component) {
            const {props, state, id} = component;

            return element(TimedComponent, {
                ...props,
                delay,
                tick: state.tick,
                stop: () => stop(component)
            });
        }

        const Timer = { initialState, afterMount, beforeUnmount, render };
        return Timer;
    };
}

export default timer;
