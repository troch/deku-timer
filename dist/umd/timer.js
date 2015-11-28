'use strict';

(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define(['exports', 'virtual-element', 'invariant'], factory);
    } else if (typeof exports !== "undefined") {
        factory(exports, require('virtual-element'), require('invariant'));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports, global.virtualElement, global.invariant);
        global.timer = mod.exports;
    }
})(this, function (exports, _virtualElement, _invariant) {
    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    var _virtualElement2 = _interopRequireDefault(_virtualElement);

    var _invariant2 = _interopRequireDefault(_invariant);

    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            default: obj
        };
    }

    var _extends = Object.assign || function (target) {
        for (var i = 1; i < arguments.length; i++) {
            var source = arguments[i];

            for (var key in source) {
                if (Object.prototype.hasOwnProperty.call(source, key)) {
                    target[key] = source[key];
                }
            }
        }

        return target;
    };

    var registry = {};

    function timer(delay) {
        (0, _invariant2.default)(typeof delay === 'number' && delay > 0, '[react-timer-hoc] `delay` should be a number greater than 0.');
        return function TimerHoc(TimedComponent) {
            var initialState = function initialState() {
                return {
                    tick: 0
                };
            };

            function afterMount(component, el, setState) {
                var id = component.id;
                var startTime = Date.now();
                var tick = 0;
                registry[id] = {
                    stopped: false
                };

                function setTimer(component) {
                    var id = component.id;
                    var state = component.state;
                    var duration = delay - (registry[id].startTime - Date.now()) % delay;
                    registry[id].timer = setTimeout(function () {
                        tick++;
                        setState({
                            tick: tick
                        });
                        if (!registry[id].stopped) setTimer(component);
                    }, delay);
                }

                setTimer(component);
            }

            function _stop(component) {
                var id = component.id;
                registry[id].stopped = true;
                clearTimeout(registry[id].timer);
            }

            function beforeUnmount(component) {
                var id = component.id;

                _stop(component);

                registry[id] = undefined;
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

            var Timer = {
                initialState: initialState,
                afterMount: afterMount,
                beforeUnmount: beforeUnmount,
                render: render
            };
            return Timer;
        };
    }

    exports.default = timer;
});
