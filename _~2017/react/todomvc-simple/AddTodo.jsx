class AddTodo extends React.Component {
  constructor() {
    super()

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault()
    if (!this.input.value.trim()) {
      return
    }
    store.dispatch(actions.addTodo(this.input.value))
    this.input.value = '';
  }
  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <input
            ref={node => {
              this.input = node
            }}
          />
          <button type="submit">
            Add Todo
          </button>
        </form>
      </div>
    )
  }
}
