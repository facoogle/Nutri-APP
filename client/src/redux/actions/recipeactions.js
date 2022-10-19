import axios from 'axios'
import {getAllRecipes, orderByRating, getRecipesByName,
    getRecipeById,createRecipe, filterByDiet, getDiets_Recipe, getAllPost, getRanking
} from '../recipeSlice'
import { getNutri, getNutriRecipes } from '../userSlice'

//-------------------- RUTAS --------------------------

//import {REACT_APP_HOST} from process.env
import dotenv from 'dotenv'
dotenv.config()
const url = process.env.REACT_APP_HOST || 'http://localhost:5001'

//-------------------- ACTIONS ------------------------
export const getRecipes = ()=> async (dispatch) => {
    try{
        let res = await axios.get(`${url}/recipes`)
        dispatch(getAllRecipes(res.data))
        let res2 = await axios.get(`${url}/diets`)
        dispatch(getDiets_Recipe(res2.data))
    }catch(e){
        console.log(e.message)
    }
}


export const orderForRating = (payload)=> async (dispatch)=>{
    try {
        dispatch(orderByRating(payload))
    } catch (error) {
        
    }

}


export const getRecipesName = (payload)=> async (dispatch)=>{
    try {
        let nodata = [{nodata:"Sorry, there are no recipes of this type"}]

        let res = await axios.get(`${url}/recipes?name=${payload}`)
        dispatch(getRecipesByName(res.data.length?res.data:nodata))
    } catch (error) {
        
    }
}

export const getRecipeDetail =(id)=> async (dispatch) => {
    try{
        let res = await axios.get(`${url}/recipe/${id}`)
        dispatch(getRecipeById(res.data))
    }catch(e){
        console.log(e)
    }
}

export const filterDiet =(payload)=>async (dispatch)=>{
    try {
        dispatch(filterByDiet(payload))
    } catch (error) {
        console.log(error)
    }
}

export const getRecipePost = (recipeId) => async (dispatch)=>{
    try {
        let res = await axios.get(`${url}/recipe/post/${recipeId}`)
        dispatch(getAllPost(res.data))
    } catch (error) {
        console.log(error)
    }
}
export const getTotalRanking = (recipeId) => async (dispatch)=>{
    try {
        let res = await axios.get(`${url}/recipe/reciperank/${recipeId}`)
        dispatch(getRanking(res.data))
    } catch (error) {
        console.log(error)
    }
}
// export const getByName = async (dispatch) => {
//     try{
//         let res = await axios.get(`http://${url}/recipes?${name}`)
//         dispatch(getRecipesByName(res.data))
//     }catch(e){
//         console.log(e)
//     }
// }


export const postRecipe = (payload) => async (dispatch) => {
    try{
        let user = JSON.parse(sessionStorage.getItem('user')) 
        let res = await axios.post(`${url}/recipe/new/${user.id}`, payload)
        console.log(res.send, 'res')
        dispatch(createRecipe(res.data))
    }catch(e){
        console.log(e)
    }
}

export const getRecipesNutri = (authorId) => async (dispatch) =>{
    try {
        let token = JSON.parse(sessionStorage.getItem('token'))
        let res = await axios.get(`${url}/recipe/createdby/${authorId}`,{
            headers:{
                'Authorization': `Bearer ${token}`,
                'Accept' : 'application/json',
                'Content-Type': 'application/json'
            }
        })
        dispatch(getNutriRecipes(res.data))
    } catch (error) {
        console.log(error)
    }
}
export const getInfoNutri = (nutriId) => async (dispatch) =>{
    try {
        let token = JSON.parse(sessionStorage.getItem('token'))
        let res = await axios.get(`${url}/recipe/nutri/${nutriId}`,{
            headers:{
                'Authorization': `Bearer ${token}`,
                'Accept' : 'application/json',
                'Content-Type': 'application/json'
            }
        })
        dispatch(getNutri(res.data))
    } catch (error) {
        console.log(error)
    }
}

// export const deleteRecipeByID = async (dispatch) => {
//     try{
//         let res = await axios.delete()
//         dispatch(deleteRecipe(res.data))
//     }catch(e){
//         console.log(e)
//     }
// }


// export const orderRating = async (dispatch) => {
//     try{
//         dispatch(orderByRating(res.data))
//     }catch(e){
//         console.log(e)
//     }
// }
