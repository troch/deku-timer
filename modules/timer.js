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
            const { id } = component;
            const startTime = Date.now();
            let tick = 0;

            registry[id] = {
                stopped: false
            };

            function setTimer(component, setState) {
                const { id, state } = component;
                const duration = delay - (registry[id].startTime - Date.now()) % delay;
                registry[id].timer = setTimeout(() => {
                    tick++;
                    setState({ tick });
                    if (!registry[id].stopped) setTimer(component, setState);
                }, delay);
            }

            setTimer(component);
        }

        function stop(component) {
            const { id } = component;
            registry[id].stopped = true;
            clearTimeout(registry[id].timer);
        }

        function beforeUnmount(component) {
            const { id } = component;
            stop(component);
            registry[id] = undefined;
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
