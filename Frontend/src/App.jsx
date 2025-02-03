
import './App.css'
import Dashboard from './Pages/Dashboard/Dashboard'

// User Imports
import Users from './Pages/Dashboard/User/Users'
import UserUpdate from './Pages/Dashboard/User/UserUpdate'
import UserCreate from './Pages/Dashboard/User/UserCreate'

// Auth Imports
import GoogleCallBack from './Pages/Website/Auth/AuthOperations/GoogleCallBack'
import  Login  from './Pages/Website/Auth/AuthOperations/Login'
import  Signup  from './Pages/Website/Auth/AuthOperations/Signup'
import RequiredAuth from './Pages/Website/Auth/AuthProtection/RequiredAuth'
import RequireBack from './Pages/Website/Auth/AuthProtection/RequireBack'


// Errors Imports
import Error404 from './Pages/Website/Auth/Errors/404'


// Category Imports
import Categories from './Pages/Dashboard/Category/Categories'
import CreateCategory from './Pages/Dashboard/Category/CreateCategory'
import UpdateCategory from './Pages/Dashboard/Category/UpdateCategory'

// Product Imports
import Products from './Pages/Dashboard/Product/Products'
import CreateProduct from './Pages/Dashboard/Product/CreateProduct'

//
import Editor from './Pages/Dashboard/Editor'

import  HomePage  from './Pages/Website/HomePage'
import { Routes, Route } from 'react-router-dom'

function App() {
  

  return (
    <>
    <Routes>

      {/*Public Routes*/}
      <Route path='/' element={<HomePage/>}></Route> 
      <Route element ={<RequireBack/>}>
        <Route path='/signup' element={<Signup/>}></Route>
        <Route path='/login' element={<Login/>}></Route>
      </Route>
      <Route path='/auth/google/callback' element= {<GoogleCallBack/>}></Route>
      <Route path='/*' element= {<Error404/>}></Route>  

      {/*Protected Routes*/}

      <Route  element ={<RequiredAuth allowedRole={["1995", "1996","1999"]}/>} >
        <Route path='/dashboard' element = {<Dashboard/>}>
         {/* Users */}
          <Route  element ={<RequiredAuth allowedRole={["1995"]}/>} >
            <Route path='users' element = {<Users/>}></Route>
            <Route path='users/:id' element = {<UserUpdate/>}></Route>
            <Route path='create' element = {<UserCreate/>}></Route>
          </Route>

          <Route  element ={<RequiredAuth allowedRole={["1999", "1995"]}/>} >
            {/* Categories */}
            <Route path='categories' element={<Categories/>}></Route>
            <Route path='categories/:id' element={<UpdateCategory/>}></Route>
            <Route path='create_category' element={<CreateCategory/>}></Route>
            {/* Products */}
            <Route path='products' element={<Products/>}></Route>
            <Route path='products/:id' element={<Products/>}></Route>
            <Route path='create_product' element={<CreateProduct/>}></Route>
          </Route>
          
          <Route  element ={<RequiredAuth allowedRole={["1996", "1995"]}/>} >
            <Route path='editor' element={<Editor/>}></Route>
          </Route>
        </Route>
        </Route>
     
    </Routes> 
     
    </>
  )
}

export default App
