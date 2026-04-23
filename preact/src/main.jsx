// import { render } from 'preact'
// import './app.css'
// import { App } from './app.jsx'
//
// render(<App />, document.getElementById('app'))
import { render } from 'preact'
import './app.css'
import { App } from './app.jsx'
import { ToastProvider } from './context/ToastContext'

render(
  <ToastProvider>
    <App />
  </ToastProvider>,
  document.getElementById('app')
)
