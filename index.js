import { useReducer } from 'react';

const PATCH = '@action_types/PATCH';
const DERIVE = '@action_types/DERIVE';

const reducer = (state, action) => {
  switch ( action.type ) {
    case PATCH:
      return {
        ...state,
        ...action.payload,
      };
    case DERIVE:
      return {
        ...state,
        ...action.updater(state),
      };
    default: console.error(`Unexpected action type: ${action.type}`); return state;
  }
};

const useSetState = (initState) => {
  const [_state, _dispatch] = useReducer(reducer, initState);
  const _patchState = update => _dispatch({ type: PATCH, payload: update });
  const _deriveState = updater => _dispatch({ type: DERIVE, updater });

  const setState = (arg) => {
    if ( typeof arg === 'function' ) {
      _deriveState(arg);
    } else {
      _patchState(arg);
    }
  };

  return [_state, setState];
};

export default useSetState;