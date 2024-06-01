import React from 'react';
import AuthForm from '../Auth/Auth_form';
import { sendAdmin_data } from '../../../api_routes';
import{useDispatch} from'react-redux';
import { adminActions } from '../../../Store/store.jsx';
function Admin(){

      const dispatch = useDispatch();
      const onResReceived = (data)=>{
         console.log("admin token",data.token);
         dispatch(adminActions.login())
         console.log(data._id)
         localStorage.setItem("admin_Id",data.id);
         localStorage.setItem("admin_Token",data.token);
      }
       async function getdata(Data,isSingup){
            console.log("email"+Data.email);
            console.log("passsword"+Data.password);
            console.log(isSingup?0:1);

           sendAdmin_data(Data).then(onResReceived)
           .catch(err=>console.log(err))
            
          }
          return (
             <AuthForm sendData={getdata} isadmin={true}  />
          )

}
export default Admin;