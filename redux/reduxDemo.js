import Redux from "./redux.js"
const showCount = document.getElementsByClassName('show-count')
const showNumber = document.getElementsByClassName('show-number')
const addCount = document.getElementsByClassName('add-count')
const addNumber = document.getElementsByClassName('add-number')
const minusCount = document.getElementsByClassName('minus-count')
const minusNumber = document.getElementsByClassName('minus-number')

const countReducer = (state = { count: 0 }, action) => {
    switch (action.type) {
        case 'incrementCount':
            return { count: state.count + 1 }
        case 'decrementCount':
            return { count: state.count - 1 }
        default:
            return state
    }
}

const numberReducer = (state = { number: 0 }, action) => {
    switch (action.type) {
        case 'incrementNumber':
            return { number: state.number + 1 }
        case 'decrementNumber':
            return { number: state.number - 1 }
        default:
            return state
    }
}

const rootReducer = Redux.combineReducers({
    counter: countReducer,
    number: numberReducer,
})

console.log(rootReducer)

const store = Redux.createStore(rootReducer)

const { dispatch, getState, subscribe} = store

const assignCount = () => {
    showCount[0].innerHTML = getState().counter.count
    console.log('111111')
}

const assignNumber = () => {
    showNumber[0].innerHTML = getState().number.number
    console.log('222222')
}

assignCount()
assignNumber()

subscribe(assignCount)
subscribe(assignNumber)

addCount[0].addEventListener('click', () => {
    dispatch({ type: 'incrementCount' })
})

addNumber[0].addEventListener('click', () => {
    dispatch({ type: 'incrementNumber' })
})

minusCount[0].addEventListener('click', () => {
    dispatch({ type: 'decrementCount' })
})

minusNumber[0].addEventListener('click', () => {
    dispatch({ type: 'decrementNumber' })
})