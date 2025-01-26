
import './App.css'
import Dashboard from './Pages/Dashboard/Dashboard'
import Users from './Pages/Dashboard/Users'
import GoogleCallBack from './Pages/Website/Auth/GoogleCallBack'
import  Login  from './Pages/Website/Auth/Login'
import RequiredAuth from './Pages/Website/Auth/RequiredAuth'
import  Signup  from './Pages/Website/Auth/Signup'
import  HomePage  from './Pages/Website/HomePage'
import { Routes, Route } from 'react-router-dom'
import UserUpdate from './Pages/Dashboard/UserUpdate'
import UserCreate from './Pages/Dashboard/UserCreate'
import Editor from './Pages/Dashboard/Editor'
import Error404 from './Pages/Website/Auth/404'
import RequireBack from './Pages/Website/Auth/RequireBack'
import Categories from './Pages/Dashboard/Categories'

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
          <Route  element ={<RequiredAuth allowedRole={["1995"]}/>} >
            <Route path='users' element = {<Users/>}></Route>
            <Route path='users/:id' element = {<UserUpdate/>}></Route>
            <Route path='create' element = {<UserCreate/>}></Route>
          </Route>
          <Route  element ={<RequiredAuth allowedRole={["1999", "1995"]}/>} >
            <Route path='products' element={<Categories/>}></Route>
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
