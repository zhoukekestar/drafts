import React from 'react'
import { Link } from 'react-router-dom'

const style = {
  display: 'inline-block',
  padding: '10px',
}
class App extends React.Component {
  render() {
    return (
      <div>
        <p>hello</p>
        <Link to='/user' style={style}>user</Link>
        <Link to='/repo' style={style}>repo</Link>
        <Link to='/todo' style={style}>todo</Link>
      </div>
    )
  }
}

export default App
