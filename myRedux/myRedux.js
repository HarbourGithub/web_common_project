export const combineReducers = (reducers) => {
    return (state = {}, action) => {
        const newState = {}
        for (let key in reducers) {
            newState[key] = reducers[key](state[key], action)
        }
        return newState
    }
}

export const createStore = (reducer) => {
    let state = undefined
    let listeners = []
    const getState = () => state
    const dispatch = (action) => {
        state = reducer(state, action)
        listeners.forEach(listener => listener())
    }
    const subscribe = (listener) => {
        listeners.push(listener)
        return () => {
            listeners = listeners.filter(item => item !== listener)
        }
    }
    dispatch({ type: 'init' })
    return { getState, dispatch, subscribe }
}

export const bindActionCreators = (actionCreators, dispatch) => {
    const boundActionCreators = {}
    for (let key in actionCreators) {
        boundActionCreators[key] = (...args) => dispatch(actionCreators[key](...args))
    }
    return boundActionCreators
}