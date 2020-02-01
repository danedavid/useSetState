import { useReducer } from 'react';

const PATCH = '@action_types/PATCH';

const reducer = (state, action) => {
  if ( action.type === PATCH ) {
    return {
      ...state,
      ...action.payload,
    };
  }
};

const useSetState = (initState) => {
  const [_state, _dispatch] = useReducer(reducer, initState);
  const _patchState = update => _dispatch({ type: PATCH, payload: update });

  const setState = (update) => {
    const newState = {
      ..._state,
      ...update,
    };

    _patchState(newState);
  };

  return [_state, setState];
};

export default useSetState;