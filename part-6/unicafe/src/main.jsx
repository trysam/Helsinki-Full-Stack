import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'


import {createStore} from 'redux'
import counterReducer from './reducers/counterReducer.jsx'

const store = createStore(counterReducer)

const root =  ReactDOM.createRoot(document.getElementById('root'))
const render = () => root.render(
  <React.StrictMode>
    <App store={store} />
  </React.StrictMode>,
)

render()
store.subscribe(render)

