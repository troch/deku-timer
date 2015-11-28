import Mock from 'component-mock';
import { expect } from 'chai';
import element from 'virtual-element';
import timer from './timer';
import jsdom from 'jsdom';

const doc = jsdom.jsdom('<!doctype html><html><body></body></html>');
const win = doc.defaultView;

global.document = doc;
global.window = win;

describe('Timer', function() {
    it('should run', function() {
        function render({ props }) {
            return element('div', props.tick);
        }

        const Counter = { render };

        const WrappedCounter = timer(1000)(Counter);

        const mock = Mock(WrappedCounter);
        const counter = mock.render({ props: { customProp: 1 }});

        expect(counter.attributes.tick).to.equal(0);
        expect(counter.attributes.delay).to.equal(1000);
        expect(counter.attributes.stop).to.be.a.function;
        expect(counter.attributes.customProp).to.equal(1);
    });
});
