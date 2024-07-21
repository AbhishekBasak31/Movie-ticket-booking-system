import React, { useEffect } from 'react'
import {useSelector,useDispatch} from 'react-redux';
import '../styles/App.css'
import Header from './header.jsx';


import{Routes, Route} from 'react-router-dom';
import Home from './comp/Home/Home.jsx';
import Admin from './comp/Admin/Admin.jsx';
import Movie from './comp/Movies/Movies.jsx';
import Auth from './comp/Auth/Auth.jsx';

import { userActions, adminActions } from '../Store/store.jsx';
import Bookings from './comp/Bookings/Bookings.jsx';
import Profile from './comp/Profile/profile.jsx';


function App() {

  const dispatch = useDispatch();


  const is_Admin_logged_in = useSelector((state)=>state.admin.isLoggedIn);
  const is_User_logged_in = useSelector((state)=>state.user.isLoggedIn);

  console.log("is Admin logged in : ",is_Admin_logged_in);
  console.log("is User logged in : ",is_User_logged_in);
  


useEffect(()=>{
  if(localStorage.getItem("userId")){
    dispatch(userActions.login())
  }
  else if(localStorage.getItem("admin_Id")){
    dispatch(adminActions.login())
  }
},[])

  return (
    <div>
      <Header/>
      <section>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/admins' element={<Admin/>}/>  
          <Route path='/movies' element={<Movie/>}/>
          <Route path='/users' element={<Auth/>}/>
          <Route path='/users/profile' element={<Profile isuser={true}/>}/>
          <Route path='/admins/profile' element={<Profile isuser={false}/>}/>
          <Route path='/bookings/:id' element={<Bookings/>}/>
        </Routes>
      </section>
      {/* <Content/> */}
      {/* <Footer/> */}
    </div>
  )
}

export default App;
