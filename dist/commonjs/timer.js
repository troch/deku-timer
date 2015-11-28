'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _virtualElement = require('virtual-element');

var _virtualElement2 = _interopRequireDefault(_virtualElement);

var _invariant = require('invariant');

var _invariant2 = _interopRequireDefault(_invariant);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var registry = {};

function timer(delay) {
    (0, _invariant2.default)(typeof delay === 'number' && delay > 0, '[react-timer-hoc] `delay` should be a number greater than 0.');

    return function TimerHoc(TimedComponent) {
        var initialState = function initialState() {
            return { tick: 0 };
        };

        function afterMount(component, el, setState) {
            var id = component.id;
            var state = component.state;

            registy[id] = {
                startTime: Date.now(),
                stopped: false
            };

            setTimeout(component);
        }

        function setTimeout(component, setState) {
            var id = component.id;
            var state = component.state;

            var duration = delay - (registry[id].startTime - Date.now()) % delay;
            registy[id].timer = setTimeout(function () {
                setState({ tick: state.tick + 1 });
                if (!registy[id].stopped) setTimeout(component, setState);
            }, delay);
        }

        function _stop(component) {
            var id = component.id;
            var state = component.state;

            registy[id].stopped = true;
            clearTimeout(registy[id].timer);
        }

        function beforeUnmount(component) {
            _stop(component);
        }

        function render(component) {
            var props = component.props;
            var state = component.state;
            var id = component.id;

            return (0, _virtualElement2.default)(TimedComponent, _extends({}, props, {
                delay: delay,
                tick: state.tick,
                stop: function stop() {
                    return _stop(component);
                }
            }));
        }

        var Timer = { initialState: initialState, afterMount: afterMount, beforeUnmount: beforeUnmount, render: render };
        return Timer;
    };
}

exports.default = timer;
