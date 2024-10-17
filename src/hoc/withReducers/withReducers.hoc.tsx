export function withReducers(reducers: { [key: string]: any }) {
  return (state: any, action: any) => {
    return Object.keys(reducers).reduce(
      (nextState, key) => {
        nextState[key] = reducers[key](state[key], action);
        return nextState;
      },
      { ...state },
    );
  };
}
