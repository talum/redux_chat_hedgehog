import { createStore, combineReducers, applyMiddleware } from 'redux' // module system. one default export. if you want something by name, use the curly braces
import React from 'react'
import { render } from 'react-dom'
import axios from 'axios'
import thunk from 'redux-thunk'
// store is smart in Alt.js 
// in redux, the store is stupid. you can ask its state and you can send it a message. 

function counter(state=0, action) { //default state 
  switch(action.type) {
    case "INCREMENT":
      return state + 1
      // no break if you return
    case "DECREMENT":
      return state - 1
    default: 
      return state
  }
}

function lastMessage(state="No Message Yet", action) {
  switch(action.type) {
    case "INCREMENT":
      return "Was incremented"
      // no break if you return
    case "DECREMENT":
      return "Was decremented"
    default:
      return state 
  }
}

//no promise resolution inside of reducers
function factsReducer(state="no facts yet", action) {
  switch(action.type) {
    case "NEW_FACT":
      return action.payload
    default:
      return state
  }
}

function getFact() {
  return (dispatch) => {
    axios.get("http://numbersapi.com/42/math").then(({data}) => {
      dispatch({type: "NEW_FACT", payload: data})
    })
  }
}

const rootReducer = combineReducers({
  counter: counter,
  lastMessage: lastMessage,
  fact: factsReducer
})

const store = createStore(
  rootReducer,
  applyMiddleware(thunk)
)

const App = (props) => {
  return (
    <div>
      <div>
        The current value is: {props.counterValue}
      </div>
      <div>
        The last message was {props.lastMessage}
      </div>
      <div>
        Random Fact: {props.fact}
      </div>
      <button onClick={() => {store.dispatch({type: "INCREMENT"})}}>UP</button>
      <button onClick={() => {store.dispatch({type: "DECREMENT"})}}>DOWN</button>
      <button onClick={() => {store.dispatch(props.getFact())}}>GET FACT</button>
    </div>
  )
}
// when you dispatch a function, middleware will kick in

// redux init
// send message to store
// dispatch => subscribe

store.subscribe(function() {
  render(<App 
    counterValue={store.getState().counter}
    lastMessage={store.getState().lastMessage},
    getFact={getFact}
    fact={store.getState().fact}
    />, document.querySelector('.container'))
})

store.dispatch({type: "INCREMENT"})

/*
  //async stuff in redux
  middleware: after your action is dispatched, moment where you can transform that to be in the right shape/format so that it can be a plain old object
  functional purity & immutability - cannot change state 
  functional purity: if given inputs, always return the same thing. outside world doesn't exist. 
  ajax requests, console logs, reading from files ==> all impure
  reducers are always pure. pass in data, should always give you back the same thing. 
  use middleware to resolve the promise, send a pure message. abstract away the ajax stuff. if you get one that's a function, resolve it this way. then send it to your reducers. dispatch the message => finish resolving => then send some message. almost like delaying dispatching
*/
