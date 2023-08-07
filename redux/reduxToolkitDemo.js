import ReduxToolkit from "./redux-toolkit.umd.js"

const showCount = document.getElementsByClassName('show-count')
const addCount = document.getElementsByClassName('add-count')
const minusCount = document.getElementsByClassName('minus-count')
const showUserInfo = document.getElementsByClassName('show-user-info')
const changeUserName = document.getElementsByClassName('change-user-name')
const changeUserAge = document.getElementsByClassName('change-user-age')

const countReducer = (state = 0, action) => {
    const { type, payload } = action
    switch (type) {
        case 'incrementCount':
            return state + payload
        case 'decrementCount':
            return state - payload
        default:
            return state
    }
}

// 使用Redux Toolkit的configureStore方法创建store
const store = ReduxToolkit.configureStore({
    reducer: {
        counter: countReducer
    },
})

const incrementCount = ReduxToolkit.createAction('incrementCount')
const decrementCount = ReduxToolkit.createAction('decrementCount')


console.log(incrementCount.toString(), decrementCount.toString())