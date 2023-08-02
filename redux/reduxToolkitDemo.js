import ReduxToolkit from "./redux-toolkit.umd.js"

// 使用Redux Toolkit的createSlice方法创建reducer
const counterSlice = ReduxToolkit.createSlice({
    name: 'counter',
    initialState: { count: 0 },
    reducers: {
        incrementCount: (state) => {
            state.count += 1
        },
        decrementCount: (state) => {
            state.count -= 1
        },
    },
})

const numberSlice = ReduxToolkit.createSlice({
    name: 'number',
    initialState: { number: 0 },
    reducers: {
        incrementNumber: (state) => {
            state.number += 1
        },
        decrementNumber: (state) => {
            state.number -= 1
        },
    },
})

// 使用Redux Toolkit的configureStore方法创建store
const store = ReduxToolkit.configureStore({
    reducer: {
        counter: counterSlice.reducer,
        number: numberSlice.reducer,
    },
})

// 使用Redux Toolkit的createAction方法创建action
// const { incrementCount, decrementCount } = counterSlice.actions
// const { incrementNumber, decrementNumber } = numberSlice.actions

// store.dispatch(incrementCount())
// console.log('初始状态：', store.getState())

