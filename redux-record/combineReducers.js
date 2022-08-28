const combineReducers = reducers =>
  (state, action) => {
    const newState = {}
    Object.keys(reducers).forEach(key => {
      newState[key] = reducers[key](state[key], action)
    })
    return newState
  }