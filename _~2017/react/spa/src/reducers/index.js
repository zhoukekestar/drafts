import { combineReducers } from 'redux'
import todos from './todo/todos'
import visibilityFilter from './todo/visibilityFilter'

const reducers = combineReducers({
  todos,
  visibilityFilter,
})

export default reducers
