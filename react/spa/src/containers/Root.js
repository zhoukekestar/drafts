import React from 'react'
import PropTypes from 'prop-types'
import { Provider } from 'react-redux'
import { Router } from 'react-router-dom'
import routes from '../routes'

const Root = ({ store }) => (
  <Provider store={store}>
    {routes}
  </Provider>
)

export default Root
