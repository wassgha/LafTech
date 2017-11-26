import React from 'react'
import { Router, Route, IndexRoute } from 'react-router'

import App from './pages/App.jsx'
import Landing from './pages/Landing.jsx'
import Visualization3 from './pages/Visualization3.jsx'
import County from './pages/County.jsx'
import School from './pages/School.jsx'

export default (
  <Router>
    <Route path='/' component={App}>
      <IndexRoute component={Landing} />
      <Route path='visualization' component={Visualization3} />
      <Route path='county/:county' component={County} />
      <Route path='school/:school' component={School} />
      <Route path='*' component={Landing} />
    </Route>
  </Router>
)
