import { Box } from "@mui/system";
import React, { useEffect, useState }  from "react";
import  {getUserBookings,getAddedMovies,getAdminData,getUserData, deleteBooking, deleteMovie}from "../../../api_routes.jsx"
import { IconButton, Typography } from "@mui/material";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import AddIcon from '@mui/icons-material/Add';
import { Link } from "react-router-dom";
import Addmovies from "../AddMovies/Addmovies.jsx";

 
function Profile(props){
    const [userbookings, setuserbookings]=useState([]);
    const[addedMovies,setaddedMovies]=useState([]);
    const[admindata,setadmindata]=useState({});
    const [userdata,setuserdata]=useState({});
    const[addmovies,setaddMovies]=useState(false);
    console.log(props.isuser);

    if(props.isuser) {
        useEffect(()=>{
           getUserData().then(res=>setuserdata(res.user)).catch(err=>console.error(err))
           getUserBookings().then(res=>setuserbookings(res.users_bookings)).catch(err=>console.error(err))

        },[])
    }
    else{
        useEffect(()=>{
            getAdminData().then(res=>setadmindata(res.admin)).catch(err=>console.error(err))
            getAddedMovies().then(res=>setaddedMovies(res.added_movies)).catch(err=>console.error(err))
        },[])
    }

  
    console.log("userdata",userdata)
    console.log("admin data",admindata)
    console.log("user bookings",userbookings)
    console.log("added movies",addedMovies)
    function handleDeleteforuser(id){
        deleteBooking(id).then(res=>console.log(res)).catch(err=>console.error(err))

    }
    function handleDeleteforadmin(id){
        deleteMovie(id).then(res=>console.log(res)).catch(err=>console.error(err))
    }
    function Close(){
        setaddMovies(false)
    }


    // LinkComponent={Link}   to="/addmovies"
    return (
       <Box width={"100%"} height={"100vh"}>
        <Box  margin={"auto"} marginTop={5} bgcolor={"white"} boxShadow={"2px 2px 2px #949494"} borderRadius={2} padding={2} display={"flex"} width={"80%"} gap={2} alignItems={"flex-start"}  >
            <Box display={"flex"} boxSizing={"border-box"} flexDirection={"column"} padding={3} justifyContent={"center"} alignItems={"center"} gap={2} width={"30%"}  bgcolor={"red"}>
                <Box marginRight={"auto"} width={"55%"} height={"23vh"} ><img style={{borderRadius:"50%"}} width={"100%"} height={"100%"} src="https://imgs.search.brave.com/8e6QukitGDYl8tmQQnBNVFHUheB31mnXT_OeI49PdME/rs:fit:860:0:0/g:ce/aHR0cHM6Ly90NC5m/dGNkbi5uZXQvanBn/LzA0Lzk4LzcyLzQz/LzM2MF9GXzQ5ODcy/NDMyM19Gb25BeThM/WVlmRDFCVUMwYmNL/NTZhb1l3dUxISjJH/ZS5qcGc" alt="" /></Box>
                <Typography sx={{width:"100%",padding:2  }} variant="h5" >{props.isuser?userdata.name:admindata.name}</Typography>
                <Typography sx={{width:"100%", padding:2}} variant="body">{props.isuser?userdata.email:admindata.email}</Typography>
            </Box>
            <Box display={"flex"} flexDirection={"column"} boxSizing={"border-box"} padding={2} justifyContent={"center"} alignItems={"center"} gap={3} width={"70%"} bgcolor={"transparent"} >
                    {props.isuser?<Typography variant="h4" sx={{textAlign:"center"}} >Bookings</Typography>:<IconButton onClick={()=>{setaddMovies(true)}} sx={{marginLeft:"auto",marginRight:2}}  ><AddIcon sx={{fontSize:40}}/></IconButton>}
                    {
                   props.isuser?userbookings.map((booking, index)=>{
                        return(
                          
                            
                                    <Box marginTop={3}  boxSizing={"border-box"} boxShadow="2px 2px 2px #949494"  display={"flex"} justifyContent={"space-evenly"} bgcolor={"green"} width={"100%"} padding={1} alignItems={"center"} gap={1} id={booking._id} key={index}>
                                        <Typography sx={{padding:2,}} variant="body" >{"Movie: "+booking.movie_name}</Typography>
                                        <Typography sx={{padding:2,}} variant="body" >{"Booking date: "+new Date(booking.dateofbooking).toLocaleDateString()}</Typography>
                                        <Typography sx={{padding:2,}} variant="body" >{"Seat number: "+booking.seatnumber}</Typography>
                                        <Typography sx={{padding:2,}} variant="body" >{"Booking time: "+booking.bookingtime}</Typography>
                                        <Typography sx={{padding:2,}} variant="body" >{"Venue: "+booking.bookedtheater}</Typography>
                                        <IconButton onClick={()=>handleDeleteforuser(booking._id)}><DeleteOutlineIcon size="medium" /></IconButton>
                                    
                                    
                            </Box>
                        )

                    }):null}
                    {
                       props.isuser?null:addedMovies.map((movie,index)=>{
                        return(
                            <Box marginTop={3}  boxSizing={"border-box"} boxShadow="2px 2px 2px #949494"  display={"flex"} justifyContent={"space-evenly"} bgcolor={"green"} width={"100%"} padding={1} alignItems={"center"} gap={1} id={movie._id} key={index}>
                               
                            <Typography sx={{padding:2,}} variant="body" >{movie.moviename}</Typography>
                            <Typography sx={{padding:2,}} variant="body" >{"Released data : "+new Date(movie.release_date).toLocaleDateString()}</Typography>
                            <Typography sx={{padding:2,}} variant="body" >{"Total bookings : "+movie.bookings.length}</Typography>
                            <Typography sx={{padding:2,}} variant="body" >{"Created at : "+new Date(movie.createdAt).toLocaleDateString()}</Typography>
                            <IconButton onClick={()=>handleDeleteforadmin(movie._id)}><DeleteOutlineIcon size="medium" /></IconButton>
                           
                        </Box>
                        )
                       })
                    }
            </Box>

        </Box>
         <Addmovies  isopen={addmovies} isClose={Close}/>      
       </Box>
    )
}


export default Profile;