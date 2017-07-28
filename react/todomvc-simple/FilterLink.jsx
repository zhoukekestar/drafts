class FilterLink extends React.Component {

  constructor(props) {
    super(props);

    // console.log(this.props)
    this.state = {
      active: props.filter === store.getState().visibilityFilter
    }

    store.subscribe(() => {
      let state = store.getState();
      this.setState((state, ownProps) => ({
        active: ownProps.filter === state.visibilityFilter
      }))
    })
  }

  onClick() {
    store.dispatch(actions.setVisibilityFilter(this.props.filter));
  }
  render() {
    if (this.state.active) {
      return (<span>{this.props.children}</span>);
    }
    return (
    <a href="#"
      onClick={e => {
        e.preventDefault()
        this.onClick()
      }}
   >
     {this.props.children}
   </a>)
  }
}
