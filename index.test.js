import React from 'react';
import useSetState from './index';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });

const ENGLISH_GREETING = 'Hello World';
const SPANISH_GREETING = 'Hola Mundo';

describe('useSetState', () => {
  const App = () => {
    const initState = {
      count: 0,
      greeting: ENGLISH_GREETING,
    };
    const [state, setState] = useSetState(initState);

    return (
      <div>
        <div id="count">{state.count}</div>
        <div id="greeting">{state.greeting}</div>
        <button
          id="language"
          onClick={() => setState(prev => ({
            greeting: prev.greeting === ENGLISH_GREETING
              ? SPANISH_GREETING
              : ENGLISH_GREETING
          }))}
        />
        <button
          id="set"
          onClick={() => setState({ count: 1 })}
        />
        <button
          id="reset"
          onClick={() => setState({ count: 0 })}
        />
        <button
          id="increment"
          onClick={() => setState(prev => ({ ...prev, count: prev.count + 1 }))}
        />
      </div>
    );
  }

  test('initial state', () => {
    const wrapper = shallow(<App/>);
    expect(wrapper.find('#count').text()).toBe('0');
  });

  test('update state', () => {
    const wrapper = shallow(<App/>);
    const setButton = wrapper.find('#set');
    const resetButton = wrapper.find('#reset');

    setButton.simulate('click');
    expect(wrapper.find('#count').text()).toBe('1');

    resetButton.simulate('click');
    expect(wrapper.find('#count').text()).toBe('0');
  });

  test('update based on prev state', () => {
    const wrapper = shallow(<App/>);
    const incButton = wrapper.find('#increment');
    const langButton = wrapper.find('#language');

    incButton.simulate('click');
    expect(wrapper.find('#count').text()).toBe('1');

    incButton.simulate('click');
    expect(wrapper.find('#count').text()).toBe('2');

    langButton.simulate('click');
    expect(wrapper.find('#greeting').text()).toBe(SPANISH_GREETING);
  });

  test('should not alter other state values', () => {
    const wrapper = shallow(<App/>);
    const incButton = wrapper.find('#increment');
    const langButton = wrapper.find('#language');

    incButton.simulate('click');
    expect(wrapper.find('#count').text()).toBe('1');
    expect(wrapper.find('#greeting').text()).toBe(ENGLISH_GREETING);

    incButton.simulate('click');
    expect(wrapper.find('#count').text()).toBe('2');
    expect(wrapper.find('#greeting').text()).toBe(ENGLISH_GREETING);

    langButton.simulate('click');
    expect(wrapper.find('#count').text()).toBe('2');
    expect(wrapper.find('#greeting').text()).toBe(SPANISH_GREETING);
  })
});