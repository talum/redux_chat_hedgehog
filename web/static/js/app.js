import { createStore, combineReducers, applyMiddleware } from 'redux' // module system. one default export. if you want something by name, use the curly braces
import React from 'react'
import { render } from 'react-dom'
import axios from 'axios'
import thunk from 'redux-thunk'
import App from './components/app'

// store is smart in Alt.js 
// in redux, the store is stupid. you can ask its state and you can send it a message. 

render(<App />, document.querySelector(".container"))
