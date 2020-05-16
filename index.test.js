import useSetState from './index';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });

test('Return values', () => {
  const App = () => {
    const initState = { error: false };
    const [state, setState] = useSetState(initState);

    expect(state).toBe(initState);
    expect(typeof setState).toBe('function');

    return null;
  }
});