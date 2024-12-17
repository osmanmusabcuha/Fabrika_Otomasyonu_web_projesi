import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { ConfigProvider } from 'antd'
import { DrawerProvider } from './context/DrawerProvider.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ConfigProvider>
      <DrawerProvider>
    <App />
      </DrawerProvider>
    </ConfigProvider>
  </React.StrictMode>,
)
