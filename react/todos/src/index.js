import React from 'react'
import { render } from 'react-dom'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import App from './components/App'
import reducer from './reducers'

const store = createStore(
  reducer,
  {
    todos: [
      {
        id: 0,
        text: '11',
        completed: false
      },
      {
        id: 1,
        text: '22',
        completed: true
      }
    ],
    visibilityFilter: 'SHOW_ALL'
  },
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)
