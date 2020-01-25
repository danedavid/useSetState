import React, { useState } from 'react';

/* usage
const [state, setState] = useSetState({
  bug: false,
  isError: true,
});

setState({ bug: true });
setState({ isError: false }, () => ref.focus());
*/

const useSetState = (initState) => {
  const [_state, _setState] = useState(initState);

  const setState = (arg) => {
    if ( typeof arg === 'function' ) {

    }
    const newState = {
      ..._state,
      ...update,
    };

    _setState(newState);
  };

  return [_state, setState];
};