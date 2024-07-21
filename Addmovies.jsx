import { Dialog ,Box ,FormLabel, Typography, TextField, Button, DialogActions,Checkbox} from "@mui/material";
import React, { useState } from "react";
import { makeStyles } from '@material-ui/core/styles';
import CloseIcon from '@mui/icons-material/Close';
import AddIcon from '@mui/icons-material/Add';
import { addMovie } from "../../../api_routes";
const useStyles = makeStyles((theme) => ({
    paperRoot: {
      padding: theme.spacing(9), // Customize padding as needed
      width: theme.spacing(50),
      textAlign:"center",
      // Add more custom styles here
    },
  }));


function Addmovies(props){
    const[input,setInput]=useState({Moviename:"",Description:"",Release_date:"",PosterURL:""})
    const[actors,setActors]=useState([])
    const[theaters,setTheaters]=useState([])
    const[showtimes,setShowtimes]=useState([])
    const[actor,setActor]=useState("")
    const[theater,setTheater]=useState("")
    const[showtime,setShowtime]=useState("")
    const classes= useStyles();
    function handleChange(event){
        const{name,value}=event.target;
        setInput((prevData)=>{
            if(name==="Featured"){
                return{
                    ...prevData,
                    Featured:true
                }
            }
            else{
                return{
                    ...prevData,
                    [name]: value
                  
                }
            }
           
        })

    }
    function handleSubmit(event){
        event.preventDefault();
        console.log({...input,Cast:actors,Theaters:theaters,Showtimes:showtimes})
        addMovie({...input,Cast:actors,Theaters:theaters,Showtimes:showtimes}).then(res=>console.log(res)).catch(err=>console.log(err))
        setInput({Moviename:"",Description:"",Release_date:"",PosterURL:""})
        props.isClose()
    }

    return(
        <Dialog
        open={props.isopen}
        onClose={props.isClose}
        fullWidth={true}
        classes={{paper:classes.paperRoot}}

        >
            <DialogActions >
            <Button color="secondary" onClick={props.isClose}><CloseIcon/></Button>
            </DialogActions>

            <Typography textAlign={"center"} marginBottom={2} >Add Movies</Typography>

            
                <Box component="form" margin={"auto"}  sx={{
        '& .MuiTextField-root': { mb: 5, width: '100%',  }, 
      }}>
            <div>
                    <TextField
                    name="Moviename"
                    variant="standard"
                    placeholder="Movie name" onChange={handleChange}
                    />
                    <div style={{display:"flex", gap:2 , alignItems:"center", justifyContent:"space-evenly", marginBottom:5}}>
                    <TextField
                    name="cast"
                    variant="standard"
                    placeholder="cast" 
                   value={actor}
                    onChange={(e)=>{setActor(e.target.value)}}
                    />
                    <Button onClick={()=>{setActors([...actors,actor])
                    setActor("")
                    }} ><AddIcon sx={{padding:0}}/></Button>
                    </div>
                    <div style={{display:"flex", gap:2 , alignItems:"center", marginBottom:5}}>
                    <TextField
                    name="theaters"
                    variant="standard"
                    placeholder="Theaters" onChange={(e)=>{setTheater(e.target.value)}}
                    value={theater}
                    />
                     <Button onClick={()=>{setTheaters([...theaters,theater])
                    setTheater("")
                    }} ><AddIcon sx={{padding:0}}/></Button>
                    </div>
                    <div style={{display:"flex", gap:2 , alignItems:"center", marginBottom:5}}>
                    <TextField
                    name="show_timing"
                    variant="standard"
                    value={showtime}
                    placeholder="show times" onChange={(e)=>{setShowtime(e.target.value)}}
                    />
                     <Button onClick={()=>{setShowtimes([...showtimes,showtime])
                     setShowtime("")
                    }} ><AddIcon sx={{padding:0}}/></Button>
                    </div>
                    <TextField
                    name="Description"
                    variant="standard"
                    placeholder="description" onChange={handleChange}
                    />
                    <TextField 
                    type="date"
                    name="Release_date"
                    variant="standard"
                    placeholder="release date" onChange={handleChange}
                    />
                    <TextField
                    name="PosterURL"
                    variant="standard"
                    placeholder="poster url" onChange={handleChange}
                    />
                    <div style={{display:"flex", gap:2 , alignItems:"center", marginBottom:5}}> <Typography textAlign={"start"} >I accept all term and conditions</Typography>
                    <Checkbox name="Featured"  sx={{display:"inline"}} onChange={handleChange} /></div>
        
            </div>

      <Button  onClick={handleSubmit} fullWidth={true} variant="contained" >Submit</Button>

                </Box>
            
        </Dialog>
    )
} 
export default Addmovies;