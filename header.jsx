import React, { useEffect, useState } from "react";
import MovieIcon from '@mui/icons-material/Movie';
import AppBar from '@mui/material/AppBar';
import { Toolbar,Box,Autocomplete,TextField,Tabs,Tab,Button} from '@mui/material';
import { getAllMovies } from "../api_routes";
import { Link } from "react-router-dom";
import {useSelector,useDispatch} from 'react-redux';
import { adminActions, userActions } from "../Store/store";
function Header(){
    const dispatch=useDispatch();
    const is_Admin_logged_in = useSelector((state)=>state.admin.isLoggedIn);
    const is_User_logged_in = useSelector((state)=>state.user.isLoggedIn);

    const [value,Setvalue]=useState(0);
    const[movies,setmovie]=useState([]);
    const Logout = (isadmin)=>{
        dispatch(isadmin?adminActions.logout():userActions.logout());


    }
    useEffect(()=>{
            getAllMovies().then((data)=>{setmovie(data.movies)}).catch((err)=>{console.error(err)});
    },[])


    return (
    <Box width={"100%"}>
    <AppBar position="sticky" sx={{bgcolor:"#F5C4DD"}}>
        <Toolbar>
            <Box  width={"20%"}>
                <Button disableRipple disableElevation disableTouchRipple LinkComponent={Link} to="/" sx={{color:"white"}}>
                <MovieIcon  fontSize="large"/>
                </Button>
                
            
            
            </Box>
            <Box width={"50%"}> 
            <Autocomplete
                 
                    disablePortal
                    sx={{":hover":{color:"secondary"}}}
                 
                    options={movies.map((option) => option.moviename)}
                    
                    renderInput={(params) => <TextField sx={{input:{color:"white"}}}  variant="standard" {...params} placeholder="Search Movies here...." />}
                />

            </Box>
            <Box display={"flex"} width={"30%"} justifyContent={"center"}>
                <Tabs  textColor="inherit" indicatorColor="secondary" value={value} onChange={(e,val)=>{
                    Setvalue(val);
                }}>
                    <Tab  LinkComponent={Link} to="/" label="Home" />
                    <Tab  LinkComponent={Link} to="/movies" label="Movies" />

                    
                    {!is_Admin_logged_in&&!is_User_logged_in&&(
                    <Tab LinkComponent={Link}  to="/admins" label="Admin" />
                     )} 

                    {!is_Admin_logged_in&&!is_User_logged_in&&(
                    <Tab  LinkComponent={Link} to="/users" label="User"/>
                     )} 





                    {/* if user is logged in then following tabs will shows */}
                    {is_User_logged_in&&(
                         <Tab LinkComponent={Link}  to="/users/profile" label="Profile" />
                    )}
                    {is_User_logged_in&&(
                         <Tab  LinkComponent={Link} to="/" label="Logout" onClick={()=>Logout(false)}/>
                    )}




                    {/* if admin is logged in then following tabs will shows */}

                    {is_Admin_logged_in&&(
                         <Tab LinkComponent={Link}   to="/admins/profile" label="Profile" />
                    )}
                    {/* {is_Admin_logged_in&&(
                         <Tab LinkComponent={Link}   to="/addmovies" label="Add movies" />
                    )} */}
                    {is_Admin_logged_in&&(
                         <Tab  LinkComponent={Link} to="/" label="Logout" onClick={()=>Logout(true)}/>
                    )}
                  
                   
                   
                    
                </Tabs>

            </Box>
           
        
        </Toolbar>
        
    </AppBar>
    </Box>);
}

export default Header;