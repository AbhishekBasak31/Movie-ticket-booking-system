import {useState,useEffect,ChangeEvent} from "react";
import { Toolbar,Box,Autocomplete,TextField,Tabs,Tab,Typography,Button,FormLabel,IconButton} from '@mui/material'
import CloseIcon from '@mui/icons-material/Close';
import axios from "axios";
import Admin from "../Admin/Admin.jsx";
import { Link } from "react-router-dom";
 function AuthForm(props){
    const[data,setdata]=useState({name:"",email:"",password:""});
    
    const lavelstyle={mt:1,mb:1,textalign:"start"};
    const[isSingin,setisSingin]=useState(false);
   
  

    function handleChange(event){
        const{name,value}=event.target;
        setdata((prevData)=>{
            return{
                ...prevData,
            [name]:value

            }
        })   
    
    }


    function handleclick(){
        setisSingin(!isSingin);
    }

     async function handleSubmit(event){
        event.preventDefault();
      
        props.sendData(data ,props.isadmin?false:isSingin);//here if th isadmin is true (means admin login tab is seleceted currently) then the  isSignup will be false ( means user login/signin tab is not seleceted currently) 
        // but if isadmin is false (means admin login tab is not seleceted currently) therefore  if isSignin is true (that means user signin tab is selected currently ) if isSignin is false (that means user login tab is selected currently)
        //  
        setdata({name:"",email:"",password:""})
        
  
    }


          
    
        return(
            <Box margin="auto"  boxSizing={"border-box"} display={"flex"} width={"100%"} height={"100vh"}   justifyContent={"center"} alignItems={"center"}>
                    <Box  boxSizing={"border-box"} width={"40%"} height={"70%"} bgcolor={"white"}  borderRadius={5} boxShadow={"2.6px 2.6px 2.6px #949494"}>
                        <Box display={"flex"} mb={0} justifyContent={"flex-end"} alignItems={"center"} padding={1.2}>
                                <IconButton  LinkComponent={Link} to="/" >
                                        <CloseIcon />
                                </IconButton>
                        </Box>
                      
                        <Box margin="auto" mt={3} mb={8} boxSizing={"border-box"} width={"70%"} height={"60vh"} display={"flex"} flexDirection={"column"} gap={5} justifyContent={"center"} alignItems={"center"}>                          
                            <Typography variant="h4" >{isSingin?"Signin":"Login"}</Typography>
                            
                        {isSingin?
                        
                        <TextField  value={data.name} name="name" onChange={handleChange} variant="standard"fullWidth placeholder="Enter Name"/>:null}
                        
                            <TextField value={data.email} name="email" onChange={handleChange} variant="standard"fullWidth placeholder="Enter Email-id"/>
                           
                            <TextField value={data.password} type="password" name="password" onChange={handleChange} variant="standard"fullWidth placeholder="Enter Password"/>
                            <Button  sx={{width:"100%",padding:2,bgcolor:"purple", boxShadow:"none" ,":hover":{bgcolor:"purple",boxshadow:"4.5px 4.5px 4.5px #949494"}}} onClick={handleSubmit}  variant="contained">{isSingin?"Sign in":"Log in"}</Button>
                        
                            {props.isadmin?null:<Button variant="text" onClick={handleclick} sx={{width:"100%",padding:2,color:"purple", boxShadow:"none" ,":hover":{bgcolor:"purple", color:"white",outline:"none",boxshadow:"4.5px 4.5px 4.5px #949494"}}}>switch to {isSingin?"Login":"Signup"}</Button>}
                                

                        </Box>
                    
                    </Box>
            </Box>
            
        );
   
    
 }
 export default AuthForm;
