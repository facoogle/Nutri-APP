import axios from 'axios'
import { getUser, getUserById, getUserStatus, getAllList, getListById, addFavRecipe, removeFavRecipe,
    updateNameList, deleteListById, getProfile,//createUser, deleteUser
} from '../userSlice'
import swal from 'sweetalert';


//-------------------- RUTAS --------------------------
import dotenv from 'dotenv'
dotenv.config()
const url = process.env.REACT_APP_HOST 


//-------------------- ACTIONS -----------------------

// export const loggedUser = async (dispatch) =>{
//     try{
//         let res = await axios.get()
//     }catch(e){
//         console.log(e.message)
//     }
// }

export const getUserDetail = () => async (dispatch) => {
    try{
        let user = JSON.parse(sessionStorage.getItem('user'))
        let token = JSON.parse(sessionStorage.getItem('token'))
        let res = await axios.get( `${url}/user/users/me/${user.id}`,{
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


export const getStatus = async (dispatch) => {
    try{
        let res = await axios.get()
        dispatch(getUserStatus(res.data))
    }catch(e){
        console.log(e)
    }
}

export const getLists =() => async (dispatch) =>{
    try {
        let user = JSON.parse(sessionStorage.getItem('user'))
        let token = JSON.parse(sessionStorage.getItem('token'))
        let res = await axios.get(`${url}/user/users/myfavorite/allfavlist/${user.id}`,{
            headers:{
                'Authorization': `Bearer ${token}`,
                'Accept' : 'application/json',
                'Content-Type': 'application/json'
            }
        })
        return dispatch(getAllList(res.data))
    } catch (error) {
        console.log(error)
    }
}
export const getIdList =( listId) => async (dispatch) =>{
    try {
        let token = JSON.parse(sessionStorage.getItem('token'))
        let res = await axios.get(`${url}/user/users/myfavorite/lists/${listId}`,{
            headers:{
                'Authorization': `Bearer ${token}`,
                'Accept' : 'application/json',
                'Content-Type': 'application/json'
            }
        })
        dispatch(getListById(res.data))
    } catch (error) {
        console.log(error)
    }
}
export const postUser =(payload)=> async (dispatch) => {
    try{
        let res = await axios.post(`${url}/user/singin`, payload)
        console.log(res, 'res')
        swal({title:"Account created successfully, check your email to confirm it",icon: "success"}).then(function() {
            window.location.href = "/";
        })
    }catch(e){
        let respuesta= JSON.parse(e.request.response).message;
        console.log(respuesta)
        swal(respuesta)
    }
}

export const logIn = (email, password) => async (dispatch) =>{
    console.log("HOLA SOY DOT", url)
    try {
        let res = await axios.post(`${url}/user/login`, email, password)
        dispatch(getUser(res.data))
        return res.data
    } catch (e) {
        let respuesta = JSON.parse(e.request.response).message;
        console.log(respuesta)
        swal(respuesta)
    }

}
export const logOut = ()  => async (dispatch) =>{
    try {
            let user =  JSON.parse(sessionStorage.getItem('userdata')) 
            let res = await axios.post(`${url}/user/logout`,user)
            // sessionStorage.setItem('user', JSON.stringify(res.data.loggedUser))
            // sessionStorage.removeItem('user')
            dispatch(getUser(res.data.loggedUser))
            return res.data.loggedUser
    } catch (error) {
        console.log(error)
    }

}

export const postRecovery =(payload)=> async (dispatch) => {
    try{
        let res = await axios.post(`${url}/user/forgot-password`, payload)
        console.log(res, 'res')
        swal({title:"Success, Please check your email to recover your password",icon: "success",}).then(function() {
            window.location.href = "/";
        })
    }catch(e){
        let respuesta= JSON.parse(e.request.response).message;
        console.log(respuesta)
        swal(respuesta)
    }
}

export const changePassword =(password,token)=> async (dispatch) => {
    try{
        
        let res = await axios.post(`${url}/user/new-password/${token}`, password)
        console.log(res, 'res')
        
        swal({title:"Your password was changed successfully",icon: "success",}).then(function() {
            window.location.href = "/login";
        })
    }catch(e){
        let respuesta= JSON.parse(e.request.response).message;
        console.log(e)
        swal("Your session expired, or token is invalid..")
    }
}

export const confirmAcc =(token)=> async (dispatch) => {
    try{
        
        let res = await axios.get(`${url}/user/confirm/${token}`)
        console.log(res, 'res')
        
        swal({title:"Your account has been confirmed, thank you!",icon: "success",}).then(function() {
            window.location.href = "/login";
        })
    }catch(e){
        let respuesta= JSON.parse(e.request.response).message;
        console.log(e)
        swal("The session has expired, or your token is invalid")
    }
}

export const addFavorite =(listId,recipeId)=> async (dispatch) =>{
    try {
        let token = JSON.parse(sessionStorage.getItem('token'))
        console.log(listId,recipeId)
        let res = await axios.post(`${url}/user/users/myfavorite/lists/${listId}`,{recipeId},{
            headers:{
                'Authorization': `Bearer ${token}`,
                'Accept' : 'application/json',
                'Content-Type': 'application/json'
            }
        })
        dispatch(addFavRecipe(res.data))
    } catch (error) {
        console.log(error)
    }
}
export const removeFavorite =(listId,recipeId)=> async (dispatch) =>{
    try {
        let token = JSON.parse(sessionStorage.getItem('token'))
        await axios.patch(`${url}/user/users/myfavorite/lists/recipes/${listId}`,{recipeId:recipeId},{
            headers:{
                'Authorization': `Bearer ${token}`,
                'Accept' : 'application/json',
                'Content-Type': 'application/json'
            }
        })
        //dispatch(removeFavRecipe(res.data))
    } catch (error) {
        console.log(error)
    }
}
export const createList = (listName) =>async(dispatch)=>{
    try {
        let user = JSON.parse(sessionStorage.getItem('user'))
        let token = JSON.parse(sessionStorage.getItem('token'))
        await axios.post(`${url}/user/users/myfavorite/newlist/`, {
        listName:listName,
        userId:user.id
        },{
            headers:{
                'Authorization': `Bearer ${token}`,
                'Accept' : 'application/json',
                'Content-Type': 'application/json'
            },
        })
    } catch (error) {
        console.log(error)
    }
}

export const changeListName =(listId,listName)=> async (dispatch) =>{
    try {
        let token = JSON.parse(sessionStorage.getItem('token'))
        await axios.patch(`${url}/user/users/myfavorite/lists/listName/${listId}`, {
        listName:listName
        },{
            headers:{
                'Authorization': `Bearer ${token}`,
                'Accept' : 'application/json',
                'Content-Type': 'application/json'
            },
        })
    } catch (error) {
        console.log(error)
    }
}
export const deleteList =(listId)=> async(dispatch) =>{
    try {
        let token = JSON.parse(sessionStorage.getItem('token'))
        await axios.delete(`${url}/user/users/myfavorite/lists/`,
        {headers:{
                'Authorization': `Bearer ${token}`,
                'Accept' : 'application/json',
                'Content-Type': 'application/json'
            },
            data:{ listId:listId}})
    } catch (error) {
        console.log(error)
    }
}

export const addCalculator =(payload)=> async (dispatch) =>{
    try {
        let token = JSON.parse(sessionStorage.getItem('token'))
        let res = await axios.post(`${url}/user/profiles/calculator`,payload,{
            headers:{
                'Authorization': `Bearer ${token}`,
                'Accept' : 'application/json',
                'Content-Type': 'application/json'
            }
        })
       // dispatch(addFavRecipe(res.data))
    } catch (error) {
        console.log(error)
    }
}

export const uploadImg =(payload)=> async (dispatch) =>{
    try {
        let token = JSON.parse(sessionStorage.getItem('token'))
        let res = await axios.post(`${url}/user/profiles/uploadimg`,payload,{
            headers:{
                'Authorization': `Bearer ${token}`,
                'Accept' : 'application/json',
                'Content-Type': 'application/json'
            }
        })
       // dispatch(addFavRecipe(res.data))
    } catch (error) {
        console.log(error)
    }
}

export const getProfileData =(userId) => async (dispatch) =>{
    try {
        let token = JSON.parse(sessionStorage.getItem('token'))
        let res = await axios.get(`${url}/user/profiles/profiles/${userId}` ,{
            headers:{
                'Authorization': `Bearer ${token}`,
                'Accept' : 'application/json',
                'Content-Type': 'application/json'
            }
        })
        //console.log("soy RESSSS", res.data)
        dispatch(getProfile(res.data))
    } catch (error) {
        console.log(error)
    }
}