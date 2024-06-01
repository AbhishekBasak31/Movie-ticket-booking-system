import axios from "axios";

export const getAllMovies=async()=>{
    const response= await axios.get('/movies').catch(err => console.error(err))
    if(response.status!==200){
        return console.error("No data");
    }
    const data= await response.data;
    return data;
}
export const getAllusers=async()=>{
    const response= await axios.get('/admins').catch(err => console.error(err))
    if(response.status!==200){
        return console.error("No data");
    }
    const data= await response.data;
    return data;
}
export const getAdmin_by_id=async(id)=>{
    console.log(id);
    const response= await axios.get(`/admins/${id}`).catch(err => console.error(err))
    if(response.status!==200){
        return console.error("No data");
    }
    const data= await response.data;
    return data;
}
export const sendUser_data=async(data,isUser)=>{
    const response= await axios.post(`/users/${isUser?"Signin":"Login"}`,isUser?{name:data.name,email:data.email,password:data.password}:{email:data.email,password:data.password})
   .catch(err=>console.error(err))
    if(response.status!==200 && response.status!==201){
        return console.error("Failed to post");
    }
    return (await response.data)
}
export const  sendAdmin_data=async(data)=>{
    const response= await axios.post("/admins/Login",{email:data.email,password:data.password})
    .catch(err=>console.error(err))
    if(response.status!==200 && response.status!==201){
        return console.error("Failed to login for admin ");
    }
    return (await response.data)
}
export const getMovie_By_id=async(id)=>{
    const response=await axios.get(`/movies/${id}`)
    .catch(err=>console.error(err));
    if(response.status!==200 && response.status!==201){
        return console.error('Failed to get perticular movie details');
    }
    return(await response.data);
}

export const bookMovie=async(input)=>{
    const id=localStorage.getItem("userId");
    const response=await axios.post(`/booking`,{movie_id:input.Movie,
        movie_name:input.Movie_name,
        seatnumber:input.Seatnumber,
        dateofbooking:input.Dateofbooking,
        bookingtime:input.Bookingtime,
        bookedtheater:input.Bookedtheater,
        user_id:id})
    .catch(err=>console.error(err));
    if(response.status!==200 && response.status!==201){
        return console.error('Failed to book movie');
    }
    return(await response.data);
}
export const getUserBookings=async()=>{
    const id= localStorage.getItem("userId");
    const response= await axios.get(`/users/bookings/${id}`)
    .catch(err=>console.error(err));
    if(response.status!==200 && response.status!==201){
        return console.error('Failed to get user booking  details');
    }
    return(await response.data);
}
export const getAddedMovies=async()=>{
    const id= localStorage.getItem("admin_Id");
    const response= await axios.get(`/admins/movies/${id}`)
    .catch(err=>console.error(err));
    if(response.status!==200 && response.status!==201){
        return console.error('Failed to get admins movies  details');
    }
    return(await response.data);
}
export const getAdminData=async()=>{
    const id= localStorage.getItem("admin_Id");
    const response= await axios.get(`/admins/${id}`)
    .catch(err=>console.error(err));
    if(response.status!==200 && response.status!==201){
        return console.error("Failed to get admin details");
    }
    return(await response.data);
}
export const getUserData=async()=>{
    const id= localStorage.getItem("userId");
    const response= await axios.get(`/users/${id}`)
    .catch(err=>console.error(err));
    if(response.status!==200 && response.status!==201){
        return console.error("Failed to get user details");
    }
    return(await response.data);
}
export const deleteBooking=async(id)=>{
    const response= await axios.delete(`/booking/${id}`)
    .catch(err=>console.error(err));
    if(response.status!==200 && response.status!==201){
        return console.error("Failed to delete booking")
    }
    return (await response.data);
}
export const deleteMovie=async(id)=>{
    const response= await axios.delete(`/movies/${id}`)
    .catch(err=>console.error(err));
    if(response.status!==200 && response.status!==201){
        return console.error("Failed to delete movie")
    }
    return (await response.data);
}
export const addMovie=async(data)=>{
    
    const response =await axios.post(`/movies`,{
        moviename:data.Moviename,
        cast:data.Cast,
        available_theaters:data.Theaters,
        show_timing:data.Showtimes,
        description:data.Description,
        featured:data.Featured,
        release_date:data.Release_date,
        posterURL:data.PosterURL,
        addedBy:localStorage.getItem("admin_Id")

    },{
        headers:{
            Authorization:`Bearer ${localStorage.getItem("admin_Token")}`
        }
    }).catch(err=>console.error(err))
    if(response.status!==200 && response.status!==201){
        return console.error("Failed to add movie")
    }
    return(await response.data);
}