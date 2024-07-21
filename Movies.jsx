import {useEffect,useState} from "react";
import { Toolbar,Box,Autocomplete,TextField,Tabs,Tab,Typography,Button} from '@mui/material'
import { getAllMovies } from "../../../api_routes";
import { Link } from "react-router-dom";
import Card_Creater from "../Home/Home_comp";
 function Movie(){
    const[movies,setmovies]=useState([]);
    useEffect(()=>{
        getAllMovies().then((data)=>[
            setmovies(data.movies)
        ]).catch((err)=>{
            console.error({Failed_to_fetch_getAllMovies_function:err})
        })
    },[])
    return (
        <Box width={"100%"} height={"100vh"} margin="auto" marginTop={2} >
               <Box margin={"auto"} width={"80%"} textAlign={"center"} marginTop={3} marginBottom={2}>
                <Typography sx={{bgcolor:"pink",color:"white" , borderRadius:5,padding:2, width:"100%"}} gutterBottom variant="h4">
                    All Movies
                </Typography>
                
            </Box>
              <Box margin={"auto"} marginTop={1} boxSizing={"border-box"} display={"flex"} gap="40px" justifyContent={"flex-start"} alignItems={"center"} flexWrap={"wrap"} maxWidth={"80%"} height={"100vh"}>
                

              {movies.map((item,index)=>{
                    return (<Card_Creater key={index} id={item._id} title={item.moviename} body={item.description} releasedate={item.release_date.slice(0,10)} img={item.posterURL}/>);
                })}
                </Box>

        </Box>
  
       
    )
 }
 export default Movie;