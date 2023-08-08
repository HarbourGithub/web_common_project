import ReduxToolkit from "./redux-toolkit.umd.js"

const showCount = document.getElementsByClassName('show-count')
const addCount = document.getElementsByClassName('add-count')
const minusCount = document.getElementsByClassName('minus-count')
const showUserInfo = document.getElementsByClassName('show-user-info')
const changeUserName = document.getElementsByClassName('change-user-name')
const changeUserAge = document.getElementsByClassName('change-user-age')
const asyncChangeUserName = document.getElementsByClassName('async-change-user-name')

const incrementCount = ReduxToolkit.createAction('INCREMENT_COUNT')
const decrementCount = ReduxToolkit.createAction('DECREMENT_COUNT')

const countReducer = ReduxToolkit.createReducer(0, (builder) => {
    builder
        .addCase(incrementCount, (state, action) => {
            return state + action.payload
        })
        .addCase(decrementCount, (state, action) => {
            return state - action.payload
        })
        .addMatcher((action) => action.payload === 100, (state, action) => {
            return state + action.payload
        })
        .addDefaultCase((state, action) => {
            return state
        })
})

// 模拟异步请求
const simulateApiRequest = (value, delay) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(value)
        }, delay)
    })
}

// 创建异步thunk action
const asyncChangeUserNameAction = ReduxToolkit.createAsyncThunk('asyncChangeUserName', async (value) => {
    const response = await simulateApiRequest(value, 1000)
    return response
})

const userInfoSlice = ReduxToolkit.createSlice({
    name: 'userInfo',
    initialState: { name: '张三', age: 18 },
    reducers: {
        changeUserNameAction(state, action) {
            state.name = action.payload
        },
        changeUserAgeAction(state, action) {
            state.age = action.payload
        },
        changeUserAgeAddTwo: {
            reducer(state, action) {
                state.age = action.payload
            },
            prepare(payload) {
                payload = payload + 2
                return { payload }
            }
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(asyncChangeUserNameAction.pending, (state, action) => {
                console.log('pending')
            })
            .addCase(asyncChangeUserNameAction.fulfilled, (state, action) => {
                console.log('fulfilled')
                state.name = action.payload
            })
            .addCase(asyncChangeUserNameAction.rejected, (state, action) => {
                console.log('rejected')
            })
    }
})

const { changeUserNameAction, changeUserAgeAction, changeUserAgeAddTwo } = userInfoSlice.actions

const loggerMiddleware = (store) => (next) => (action) => {
    console.log('dispatching', action)
    const result = next(action)
    console.log('next state', store.getState())
    return result
}

// 使用Redux Toolkit的configureStore方法创建store
const store = ReduxToolkit.configureStore({
    reducer: {
        count: countReducer,
        userInfo: userInfoSlice.reducer
    },
    middleware: [loggerMiddleware, ...ReduxToolkit.getDefaultMiddleware()]
})

const { dispatch, getState, subscribe } = store

const assignCount = () => {
    showCount[0].innerHTML = getState().count
}
const assignUserInfo = () => {
    const userInfo = getState().userInfo
    showUserInfo[0].innerHTML = `姓名：${userInfo.name}，年龄：${userInfo.age}`
}

assignCount()
assignUserInfo()

subscribe(assignCount)
subscribe(assignUserInfo)

const boundActionsCreators = ReduxToolkit.bindActionCreators({
    incrementCount,
    decrementCount,
    changeUserNameAction,
    changeUserAgeAction,
    changeUserAgeAddTwo,
    asyncChangeUserNameAction
}, dispatch)

addCount[0].addEventListener('click', () => {
    boundActionsCreators.incrementCount(3)
})

minusCount[0].addEventListener('click', () => {
    boundActionsCreators.decrementCount(2)
})

changeUserName[0].addEventListener('click', () => {
    boundActionsCreators.changeUserNameAction('李四')
})

changeUserAge[0].addEventListener('click', () => {
    boundActionsCreators.changeUserAgeAddTwo(20)
})

asyncChangeUserName[0].addEventListener('click', () => {
    boundActionsCreators.asyncChangeUserNameAction('王五')
})