import React from 'react'
import { connect } from 'react-redux'
import { toggleTodo } from '../../actions'
import TodoList from '../../components/todo/TodoList'

const getVisibleTodos = (todos, filter) => {
  switch (filter) {
    case 'SHOW_ALL':
      return todos
    case 'SHOW_COMPLETED':
      return todos.filter(t => t.completed)
    case 'SHOW_ACTIVE':
      return todos.filter(t => !t.completed)
    default:
      throw new Error('Unknown filter: ' + filter)
  }
}

const mapStateToProps = (state) => {
  console.log(state)
  return {
    todos: getVisibleTodos(state.todos, state.visibilityFilter),
    filter: state.visibilityFilter,
  }
}

const mapDispatchToProps = {
  onTodoClick: toggleTodo,
  onzkk() {
    console.log('zkk')
  }
}

const VisibleTodoList = connect(
  mapStateToProps,
  mapDispatchToProps
)(TodoList)

export default VisibleTodoList
