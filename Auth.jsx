import React, { useState } from "react";
// import { Toolbar,Box,Autocomplete,TextField,Tabs,Tab,Typography,Button} from '@mui/material'
import AuthForm from "./Auth_form.jsx";
import{useDispatch}from'react-redux';
import { sendUser_data } from "../../../api_routes.jsx";
import { userActions } from "../../../Store/store.jsx";
 function Auth(){

   const dispatch=useDispatch();
   
   const onResReceived = (data)=>{
      console.log(data.existing_user._id);
      dispatch(userActions.login())
      localStorage.setItem("userId",data.
      existing_user._id);
   }

   async function getdata(Data,isUser){
      console.log("is user : ",isUser);
      if(isUser){
         console.log("email :"+Data.email);
         console.log("name :"+Data.name);
         console.log("password :"+Data.password);
      }
      else{
         console.log("email :"+Data.email);
         console.log("password :"+Data.password);
      }
      sendUser_data(Data,isUser).then(onResReceived)
     
      .catch(err=>console.log({Error_to_post_user_data:err}))
   }    
      return (
         <AuthForm sendData={getdata} isadmin={false} />
      )
    
 }
 export default Auth;