import axios from 'axios'
// eslint-disable-next-line
import { getAllRecipes, getAllUsers, getRecipeById, getUserById, banUser, banRecipe, postAdmin, updateUser } from '../adminSlice'


//-------------------- RUTAS --------------------------
//import {REACT_APP_HOST} from process.env
import dotenv from 'dotenv'
dotenv.config()
const url = process.env.REACT_APP_HOST || 'http://localhost:5001'

//const token = JSON.parse(sessionStorage.getItem('token'))

//-------------------- ACTIONS ------------------------
export const getRecipes = ()=> async (dispatch) => {
    try{
        let token = JSON.parse(sessionStorage.getItem('token'))
        let res = await axios.get(`${url}/recipes`,{
            headers:{
                'Authorization': `Bearer ${token}`,
                'Accept' : 'application/json',
                'Content-Type': 'application/json'
            }
        })
        console.log(res.data, "RECIPES")
        dispatch(getAllRecipes(res.data))
    }catch(e){
        console.log(e.message)
    }
}


export const getRecipeDetail =(id)=> async (dispatch) => {
    try{
        let token = JSON.parse(sessionStorage.getItem('token'))
        let res = await axios.get(`${url}/recipe/${id}`,{
            headers:{
                'Authorization': `Bearer ${token}`,
                'Accept' : 'application/json',
                'Content-Type': 'application/json'
            }
        })
        dispatch(getRecipeById(res.data))
    }catch(e){
        console.log(e)
    }
}


export const getUserDetail = (id) => async (dispatch) => {
    try{
        let token = JSON.parse(sessionStorage.getItem('token'))
        let res = await axios.get(`${url}/user/admin/search/${id}`,{
            headers:{
                'Authorization': `Bearer ${token}`,
                'Accept' : 'application/json',
                'Content-Type': 'application/json'
            }
        })
        dispatch(getUserById(res.data))
    }catch(e){
        console.log(e)
    }
}


export const getUsers = () => async (dispatch) => {
    try{
        let token = JSON.parse(sessionStorage.getItem('token'))
        
        let res = await axios.get(`${url}/user/admin/search`,{
            headers:{
                'Authorization': `Bearer ${token}`,
                'Accept' : 'application/json',
                'Content-Type': 'application/json'
            }
        })
        dispatch(getAllUsers(res.data))
    }catch(e){
        console.log(e)
    }
}


export const banUserById = (id,banned) => async (dispatch) => {
    
    
    try{
        let token = JSON.parse(sessionStorage.getItem('token'))
        let res = await axios.post(`${url}/user/admin/search/${id}`,{banned},{
            headers:{
                'Authorization': `Bearer ${token}`,
                'Accept' : 'application/json',
                'Content-Type': 'application/json'
            }
        })
        
        //dispatch(banUser(res.data))
    }catch(e){
        console.log(e)
    }
}


export const banRecipeById = (id,banned) => async (dispatch) => {
    try{
        let token = JSON.parse(sessionStorage.getItem('token'))
        let res = await axios.post(`${url}/user/admin/ban/${id}`,{banned},{
            headers:{
                'Authorization': `Bearer ${token}`,
                'Accept' : 'application/json',
                'Content-Type': 'application/json'
            }
        })
        //dispatch(banRecipe(res.data))
    }catch(e){
        console.log(e)
    }
}


// export const banRecipeById = (id) => async (dispatch) => {
//     try{
//         let token = JSON.parse(sessionStorage.getItem('token'))
//         let res = await axios.post(`http://${url}/user/admin/ban/${id}`,{
//             headers:{
//                 'Authorization': `Bearer ${token}`,
//                 'Accept' : 'application/json',
//                 'Content-Type': 'application/json'
//             }
//         })
//         dispatch(banRecipe(res.data))
//     }catch(e){
//         console.log(e)
//     }
// }


export const newAdmin = (payload) => async (dispatch) => {
    try{
        let token = JSON.parse(sessionStorage.getItem('token'))
        let res = await axios.post(`${url}/user/admin/singin`, payload,{
            headers:{
                'Authorization': `Bearer ${token}`,
                'Accept' : 'application/json',
                'Content-Type': 'application/json'
            }
        })
        dispatch(postAdmin(res.data))
    }catch(e){
        console.log(e)
    }
}


// export const updateUserById = (id, payload) => async (dispatch) => {
//     try{
//         let res = await axios.put(`http://${url}/user/admin/search/${id}`, payload,{
        //     headers:{
        //         'Authorization': `Bearer ${token}`,
        //         'Accept' : 'application/json',
        //         'Content-Type': 'application/json'
        //     }
        // })
//         dispatch(updateUser(res.data))
//     }catch(e){
//         console.log(e)
//     }
// }