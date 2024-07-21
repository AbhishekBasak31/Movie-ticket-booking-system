import {configureStore, createSlice} from "@reduxjs/toolkit"

const userSlice =createSlice({
    name:"user",
    initialState:{isLoggedIn:false},
    reducers:{
        login(state){
            state.isLoggedIn=true;
        },
        logout(state){
            localStorage.removeItem("userId");
            state.isLoggedIn=false;
        },
    },
});
const adminSlice = createSlice({
    name:"admin",
    initialState:{isLoggedIn:false},
    reducers:{
        login(state){
            state.isLoggedIn=true;
        },
        logout(state){
            localStorage.removeItem("admin_Id");
            localStorage.removeItem("admin_Token");
            state.isLoggedIn=false;
        },
    },
});

export const userActions=userSlice.actions;
export const adminActions=adminSlice.actions;
export const store = configureStore({
    reducer:{
        user:userSlice.reducer,
        admin:adminSlice.reducer,

    }
});