import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import reducer from './reducers/reducer.js'
import { Provider } from 'react-redux'


import {createStore} from 'redux'

const counterStore = createStore(reducer.counterReducer);
const noteStore = createStore(reducer.noteReducer) 

const root = ReactDOM.createRoot(document.getElementById('root')).render(
<Provider store={noteStore}>
  <App />
</Provider>
)