import React from 'react'
import { connect } from 'react-redux'
import AddTodo from '../components/todo/AddTodo'
import VisibleTodoList from './todo/VisibleTodoList'

const TodoApp = () => {
  return (
    <div>
      <AddTodo />
      <VisibleTodoList />
    </div>
  )
}

export default TodoApp
