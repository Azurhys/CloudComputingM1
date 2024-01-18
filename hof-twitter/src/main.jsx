import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import 'bootstrap/dist/css/bootstrap.min.css';

import {  BrowserRouter , Routes , Route } from "react-router-dom"
import Masterclass from './composants/Masterclass';
import Flop from './composants/Flop';
import Chef from './composants/Chef';
import Accueil from './composants/Accueil';

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
      <Routes>
        <Route path='/' element={<App />}>
        </Route>
      </Routes>
  </BrowserRouter>
)

