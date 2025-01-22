import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import './Css/components/form.css'
import'./Css/components/button.css'
import'./Css/components/Alerts.css'
import './Css/components/LoadingScreen.css'
import './Css/components/google.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.js'
import App from './App.jsx'
import { BrowserRouter as Router } from 'react-router-dom'
import MenuContext from './Context/MenuContext.jsx'
import WindowContext from './Context/WindowContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <WindowContext>
      <MenuContext>
        <Router>
          <App />
        </Router>
      </MenuContext>
    </WindowContext>
  </StrictMode>
)
