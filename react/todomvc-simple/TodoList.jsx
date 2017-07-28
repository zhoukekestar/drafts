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

class TodoList extends React.Component {

  constructor() {
    super();

    store.subscribe(() => {
      console.log('..')
      let state = store.getState();
      this.setState({
        todos: getVisibleTodos(state.todos, state.visibilityFilter)
      })
    })

    this.state = {
      todos: []
    }
  }
  onTodoClick(id) {
    store.dispatch(actions.toggleTodo(id));
  }
  render() {
    return (
      <ul>
        {this.state.todos.map(todo => (
          <Todo key={todo.id} {...todo} onClick={() => this.onTodoClick(todo.id)} />
        ))}
      </ul>
    )
  }
}
