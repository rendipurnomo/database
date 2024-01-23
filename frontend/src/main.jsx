import { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './global.css'
import axios from 'axios'
import { Provider } from 'react-redux'
import { store } from './redux/store.js'

axios.defaults.withCredentials = true

ReactDOM.createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
    <App />
    </Provider>
  </StrictMode>,
)
