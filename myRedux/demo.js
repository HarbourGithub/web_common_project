import { combineReducers, createStore, bindActionCreators } from './myRedux.js'

const showCount = document.getElementsByClassName('show-count')
const addCount = document.getElementsByClassName('add-count')
const minusCount = document.getElementsByClassName('minus-count')
const showUserInfo = document.getElementsByClassName('show-user-info')
const changeUserName = document.getElementsByClassName('change-user-name')
const changeUserAge = document.getElementsByClassName('change-user-age')

const incrementCount = (payload) => {
    return { type: 'incrementCount', payload }
}
const decrementCount = (payload) => {
    return { type: 'decrementCount', payload }
}

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

const changeUserNameAction = (payload) => {
    return { type: 'changeUserName', payload }
}
const changeUserAgeAction = (payload) => {
    return { type: 'changeUserAge', payload }
}

const userInfoReducer = (state = {name: '张三', age: 18}, action) => {
    const { type, payload } = action
    switch (type) {
        case 'changeUserName':
            return {...state, name: payload}
        case 'changeUserAge':
            return {...state, age: payload}
        default:
            return state
    }
}

const rootReducer = combineReducers({
    count: countReducer,
    userInfo: userInfoReducer,
})

const store = createStore(rootReducer)

const { dispatch, getState, subscribe} = store

const boundActionsCreators = bindActionCreators({ 
    incrementCount,
    decrementCount,
    changeUserNameAction,
    changeUserAgeAction
}, dispatch)

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
    boundActionsCreators.changeUserAgeAction(20)
})

