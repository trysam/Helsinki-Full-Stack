import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import noteReducer from './reducers/noteReducer.js'
import filterReducer from './reducers/filterReducer.js'
import counterReducer from './reducers/counterReducer.js'

import { Provider } from 'react-redux'
import {configureStore} from '@reduxjs/toolkit'

const store = configureStore({
  reducer: {
    notes: noteReducer,
    filter: filterReducer,
    counter: counterReducer
  }
})

const root = ReactDOM.createRoot(document.getElementById('root')).render(
<Provider store={store}>
  <App />
</Provider>
)