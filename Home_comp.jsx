import React from 'react'
import{Card,CardActions,CardMedia,CardContent,Typography,Button} from "@mui/material";
import { Link } from "react-router-dom";
function Card_Creater(props){
    return (
        <Card id={props.id} sx={{ maxWidth: 250, height:400,  borderRadius:5,":hover":{boxShadow:"2px 2px 2px #949494"} }}>
          <img src={props.img} alt="" height="250" width="100%" style={{objectFit:"cover",boxSizing:"unset"}} />
          <CardContent sx={{boxSizing:"unset"}}>
            <Typography sx={{boxSizing:"unset"}} gutterBottom variant="h5" component="div" fontSize={"0.9vw"} >
             {props.title}
            </Typography>
            
            <Typography gutterBottom  variant="body2" color="text.secondary" fontSize={"0.8vw"} >
             Released on: {props.releasedate}
            </Typography>
          </CardContent>
          <CardActions sx={{textAlign:"center"}}>
            <Button LinkComponent={Link} to={`/bookings/${props.id}`} sx={{bgcolor:"pink", color:"white",borderRadius:2, margin:"auto",marginTop:0, textAlign:"center", ":hover":{boxShadow:"2px 2px 2px #949494",bgcolor:"pink" }}} variant="outline" size="small"   >Book</Button>
            
          </CardActions>
        </Card>
      );
}
export default Card_Creater;