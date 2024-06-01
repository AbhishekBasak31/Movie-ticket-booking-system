import React from 'react'
import {Provider} from 'react-redux';
import { store } from './Store/store.jsx';
import ReactDOM from 'react-dom/client'
import App from './Componennts/App.jsx'
import './styles/index.css'
import { BrowserRouter } from 'react-router-dom'
import axios  from 'axios'
axios.defaults.baseURL='http://localhost:5000'


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <BrowserRouter>

            <Provider store={store}>
               <App />
            </Provider>
               
       
      
      </BrowserRouter>
 
  </React.StrictMode>,
)
