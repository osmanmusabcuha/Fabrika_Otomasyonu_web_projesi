import './App.css'
import DashboardLayout from './layouts/DashboardLayout'
import Customers from './pages/Customers'
import Employee from './pages/Employee'
import Home from './pages/Home'
import {BrowserRouter, Routes, Route} from "react-router-dom"
import Inventory from './pages/Inventory'
import Orders from './pages/Orders'
import Login from './pages/auth/Login'
import OrderItems from './pages/OrderItems'
import Production from './pages/Production'


function App() {
  
  return (
    <div className='App'>
      <BrowserRouter>
      <Routes path="/">
      <Route index element={<Login />} />
      
      </Routes>
        <Routes>
          <Route path="/dashboard" element={<DashboardLayout/>}>
            <Route index element={<Home/>}/>
            <Route path="/dashboard/employee" element={<Employee/>}/>
            <Route path='/dashboard/inventory' element={<Inventory/>}/>
            <Route path='/dashboard/orders' element={<Orders/>}/>
            <Route path='/dashboard/customers' element={<Customers/>}/>
            <Route path='/dashboard/order-items' element={<OrderItems/>}/>
            <Route path='/dashboard/production' element={<Production/>}/>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
