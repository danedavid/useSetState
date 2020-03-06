# useSetState

> Dead simple React Hook that can replace `this.setState`

### Demo: [codesandbox](https://codesandbox.io/s/usesetstate-nej3z)

- Supports updater function or simple object as first argument:
```JSX
setState({ count: 0 });
setState(prev => ({ count: prev.count + 1 }));
```
- Supports optional callback as second parameter:
```JSX
setState(
  { text: ev.target.value },
  () => inputRef.current.focus()
);
```

### Usage

```JSX
import React from "react";
import useSetState from "useSetState";

const App = () => {
  const [state, setState] = useSetState({
    count: 0,
  });

  return (
    <>
      {state.count}
      <button onClick={() => setState({ count: state.count + 1 })}>
        Increment
      </button>
    </>
  );
};

export default App;
```

---

Made with ❤ by [danedavid](https://github.com/danedavid)