import { createStore, compose } from 'redux'
import reducers from '../reducers'

const configureStore = preloadedState => {

  const store = createStore(
    reducers,
    preloadedState,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )

  return store
}

export default configureStore
