import React from 'react'
import { Route, BrowserRouter } from 'react-router-dom'
import App from './containers/App'
import RepoPage from './containers/RepoPage'
import UserPage from './containers/UserPage'
import TodoApp from './containers/TodoApp'

const routes = (
<BrowserRouter>
  <div>
    <Route path='/' component={App} />
    <Route path='/repo' component={RepoPage} />
    <Route path='/user' component={UserPage} />
    <Route path='/todo' component={TodoApp} />
  </div>
</BrowserRouter>
);

export default routes;
