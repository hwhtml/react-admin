import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import registerServiceWorker from './registerServiceWorker'

// ReactDOM.render(<App />, document.getElementById('root'));
// registerServiceWorker();

// import { HashRouter } from 'react-router-dom'
ReactDOM.render((
  <App />
), document.getElementById('root'))

registerServiceWorker()
