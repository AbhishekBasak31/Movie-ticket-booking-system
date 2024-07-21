import React, { Fragment, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { bookMovie, getMovie_By_id } from "../../../api_routes";
import {useSelector} from 'react-redux';
import { Box, FormLabel, TextField, Typography,Autocomplete, Button,Select ,MenuItem} from "@mui/material";
import { redirect } from "react-router-dom";

function Bookings(){
    const {id}=useParams();
    console.log("movie id : ",id);
    const is_User_logged_in = useSelector((state)=>state.user.isLoggedIn);
    const[movie, setMovie]=useState({});
    const [movie_cast ,setMovieCast]=useState([]);
    const[available_Theaters,setTheaters] = useState([]);
    const[show_Time_slot,setTimeSlot]=useState([]);
    const [input,setInput]=useState({Movie:"",Movie_name:"", Seatnumber:"",Dateofbooking:"",Bookingtime:"",Bookedtheater:""});



    useEffect(()=>{
        getMovie_By_id(id).then((res)=>{
            setMovie(res.movie) 
            setMovieCast(res.movie.cast)
            setTheaters(res.movie.available_theaters)
            setTimeSlot(res.movie.show_timing)
        }).catch(err=>console.error("Failed to get perticular movie detail",err))
    },[id])
    console.log(movie);
    console.log(movie._id)

    function handleChange(event){
    const{name,value}=event.target
        setInput((prevData)=>{
                    return{
                            ...prevData,
                        Movie:movie._id,
                        Movie_name:movie.moviename,
                        [name]:value,
                        
                    }  
        })
    }

    function handleClick(event) {
        event.preventDefault();
        console.log(input);
        console.log(is_User_logged_in);
       if(is_User_logged_in===true) {
        bookMovie(input)
        .then((res)=>console.log(res))
        .catch(err=>console.error("Failed to book the movie",err))
        setInput({Movie:"",Movie_name:"", Seatnumber:"",Dateofbooking:"",Bookingtime:"",Bookedtheater:""})
       }
       else if(is_User_logged_in===false){
        return redirect( to="/users");
       }
    }

    console.log(input)







    // var movie_cast=movie.cast;
    const Form_label_style={padding:2 ,fontSize:"1vw",alignContent:"flex-start"}
return(movie&&
<Fragment >
    <Typography 
    margin={"auto"} 
    marginTop={2} 
    padding={2} 
    width={"80%"}
     bgcolor={"pink"}
     borderRadius={5}
    variant="h4"
    color={"white"}
    fontFamily={"sans-serif"}
     textAlign={"center"}
     boxSizing={"border-box"}
     >
    

        Book ticket for the movie:{movie.moviename}</Typography>

        <Box margin={"auto"} marginTop={2} display={"flex"} boxSizing={"border-box"} width={"80%"} bgcolor={"white"} borderRadius={5} justifyContent={"center"} padding={2} >
            <Box display={"flex"} flexDirection={"column"}  boxSizing={"border-box"} justifyContent={"flex-start"} width={"50%"} >
                <img src={movie.posterURL} alt={movie.title}  objectfit={"cover"} width={"80%"} height={"700px"} />
                <Box display={"flex"} width={"80%"}  boxSizing={"border-box"} justifyContent={"center"} textAlign={"justify"} flexDirection={"column"} >
                    <Typography width={"100%"} padding={1} paddingTop={3} variant="body">
                        About: 
                        {" "+movie.description+" "}
                    </Typography>
                    <Typography padding={1} variant="body">
                        Casts:
                        {movie_cast&&movie_cast.map((Cast)=>" "+Cast+",")}
                    </Typography>
                    <Typography padding={1}width={"100%"} variant="body">
                        Release Date:
                        {" "+new Date(movie.release_date).toLocaleDateString()+" "}
                    </Typography>

                </Box>
        </Box>

         <form onSubmit={handleClick} style={{width:"50%", boxSizing:"border-box"}} >  

            
            <Box display={"flex"}  boxSizing={"border-box"} flexDirection={"column"} justifyContent={"flex-start"} gap={5} alignItems={"flex-start"} width={"100%"} padding={2}>
                   
                    <FormLabel sx={Form_label_style}>Seat No</FormLabel>

                    <TextField sx={{width:"100%"}} variant="standard" name="Seatnumber" value={input.Seatnumber}  onChange={handleChange} type="number"/>

                    <FormLabel sx={Form_label_style}>Booking Date</FormLabel>

                    <TextField sx={{width:"100%"}} variant="standard" name="Dateofbooking" value={input.Dateofbooking}   onChange={handleChange} type="date"/>

                    <FormLabel sx={Form_label_style}>Time Slot</FormLabel>

                    <Box width={"100%"}>
                             <Select
                                     labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    variant="standard"
                                    name="Bookingtime"
                                    value={input.Bookingtime}
                                    onChange={handleChange}
                                    sx={{width:"100%"}}

                                    >
                                   {show_Time_slot&&show_Time_slot.map((time)=>{
                                    return(
                                        <MenuItem value={time}>{time}</MenuItem>
                                    )
                                   })} 
                                </Select>

                    </Box>


                    <FormLabel sx={Form_label_style}>Theater</FormLabel>

                    <Box width={"100%"}>
                                 <Select
                                     labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    variant="standard"
                                    name="Bookedtheater"
                                    value={input.Bookedtheater}
                                    onChange={handleChange}
                                    sx={{width:"100%"}}

                                    >
                                   {available_Theaters&&available_Theaters.map((theater)=>{
                                    return(
                                        <MenuItem value={theater}>{theater}</MenuItem>
                                    )
                                   })} 
                                </Select>

                    </Box>
                   <Button sx={{width:"100%",padding:2.5,marginTop:17}} variant="contained" type="submit" >Book</Button>

            </Box>
        </form>
    </Box>

</Fragment>)
}

export default Bookings;