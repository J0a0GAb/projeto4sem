import 'bootstrap/dist/css/bootstrap.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import {
  ToastContainer
} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import App from './App';
import './assets/styles/resset.css';
import './assets/styles/styles.css';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
      <>
       <BrowserRouter>
          <App />
        </BrowserRouter>
        <ToastContainer theme="colored"/>
        </>
    </React.StrictMode>

);


