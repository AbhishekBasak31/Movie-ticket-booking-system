import React from "react";
import { Toolbar,Box,Autocomplete,TextField,Tabs,Tab,Typography,Button} from '@mui/material'
import Card_Creater from "./Home_comp";
import {useEffect,useState} from "react";
import { getAllMovies } from "../../../api_routes";
import { Link } from "react-router-dom";
 function Home(){
     const[movies,setmovie]=useState([]);
     useEffect(()=>{
          getAllMovies().then((data)=>{setmovie(data.movies)}).catch((err)=>{console.error(err);});
     },[])
     console.log(movies)
    return (
        <Box width={"100%"} height={"100vh"} margin="auto" marginTop={2} >
            <Box  margin="auto" width={"80%"} height={"40vh"} padding={2} overflow={"hidden"}> 
                <img src="https://w.forfun.com/fetch/1b/1b7ac7fb289a684dcd40f3d5234ea901.jpeg?w=1470&r=0.5625" width={"100%"} height={"100%"} alt="" />

            </Box>
            <Box textAlign={"center"} marginTop={2} marginBottom={2}>
                <Typography gutterBottom variant="h4">
                    Latest Release
                </Typography>
                
            </Box>
            <Box display={"flex"}margin="auto" width={"80%"} gap={"15px"} justifyContent={"center"} alignItems={"center"} flexWrap={"wrap"} >
                {movies.slice(0,6).map((item,index)=>{
                    return (<Card_Creater id={item._id} key={index} title={item.moviename} body={item.description} releasedate={item.release_date.slice(0,10)} img={item.posterURL}/>);
                })}
            </Box>
            <Box display={"flex"} justifyContent={"center"} alignItems={"center"} maxWidth={"100%"} height={"10vh"} padding={3} >
               <Button  LinkComponent={Link} to="/movies" variant="contained" sx={{padding:2, bgcolor:"pink",borderRadius:2,":hover":{boxShadow:"2px 2px 2px #949494",bgcolor:"pink" }}}>View all movies</Button>
            </Box>
        </Box>
    )
 }
 export default Home;