import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux";
import FavoriteList from '../../components/usersBoart/FavoriteList';
import Info from '../../components/usersBoart/Info';
import List from '../../components/usersBoart/List';
import NewList from '../../components/usersBoart/NewList';
import { NavBar } from '../../components/utils/nav/nav';
import { changeListName, createList, deleteList, getIdList, getLists, getUserDetail, removeFavorite, uploadImg,getProfileData } from '../../redux/actions/useractions';

import "./userProfile.css"
import perfilimg from "./perfilimg.jpg"

import { useNavigate } from "react-router-dom"
import { getPosts } from '../../redux/actions/postAction';
import UserPost from '../../components/usersBoart/UserPost';


const UserProfile = () => {
    const loggedUserSession = window.sessionStorage.getItem("user")
    const dispatch = useDispatch()
    const {user} =useSelector((state)=>state.user)
    const {userPost} =useSelector((state)=>state.user)
    const {favList} = useSelector((state) => state.user)
    const {list} = useSelector((state) => state.user)
    const {profile} = useSelector((state) => state.user)

    const [ image, setImage ] = useState(perfilimg)
    const [ image2, setImage2 ] = useState("")
    const [ loading, setLoading ] = useState(false)
    const ImgProfile = "https://d500.epimg.net/cincodias/imagenes/2016/07/04/lifestyle/1467646262_522853_1467646344_noticia_normal.jpg"
    const uploadImage = async (e) => {
      
      const files = e.target.files;
      const data = new FormData();
      data.append("file", files[0])
      data.append("upload_preset", "images");
      setLoading(true)
      const res = await fetch(
        "https://api.cloudinary.com/v1_1/dq4zroj42/image/upload",
        {
          method: "POST",
          body: data,
        }
      )
      const file = await res.json();
      
      
      setImage(file.secure_url)
      setImage2(file.secure_url)
      console.log(file.secure_url)
      setLoading(false)
      
    }

    const navigate2 = useNavigate()


    useEffect(()=>{
        if(!loggedUserSession){navigate2("/home")}
        dispatch(getUserDetail())
        dispatch(getPosts())
    },[])
    useEffect(()=>{
        dispatch(getLists())
    },[dispatch])
    useEffect(()=>{
      dispatch(getProfileData(userId))
    },[dispatch])
    //console.log("hola soy getProfileData", profile)
    function handleUpdate(id, value){
      try {
        dispatch(changeListName(id, value))
        setTimeout(()=>{
          dispatch(getLists())
        },100)
      } catch (error) {
        console.log(error)
      }
    }
    function handleDelete(listId){
      try {
        alert('Do you wanna delete this list?')
        dispatch(deleteList(listId))
        setTimeout(()=>{
          dispatch(getLists())
          dispatch(getIdList())
        },100)
      } catch (error) {
        console.log(error)
      }
    }
    function onDeleteRecipe(listId,recipeId) {
      
      alert('Do you wanna delete this recipe?')
      dispatch(removeFavorite(listId,recipeId))
      setTimeout(()=>{
        dispatch(getLists())
        dispatch(getIdList(listId))
      },50)
    }
    function onCreate(listName){
      dispatch(createList(listName))
      setTimeout(()=>{
        dispatch(getLists())
      },50)
    }
    function handleRenderList(id){
      dispatch(getIdList(id))
    }

    let userLogged
    if(loggedUserSession){
     userLogged = JSON.parse(loggedUserSession)
  }

  const userId = userLogged?userLogged.id:"nada";

    const postImg = (e) => {
      e.preventDefault()
      
      dispatch(uploadImg({userId,image}))
    }


    

return (
    <div className='profileCon'>
      <NavBar />

      <div className='profile-arriba'>
    <div className="username1">
        <Info
        user={user} />
    </div>
    { !profile.length?<div className='profiledetalles'>
              <h3>Peso: 0 Kg</h3>
              <h3>Height: 0 Cm</h3>
              <h3>IBM: 0</h3>
              <div className='modifyibm'>
       <a href='/calculatorimc'>Modify IBM</a>
     </div>
          </div>:
        profile.map((el) => {
            
          return (
            <div className='profiledetalles'>
              <h3>Peso: {el.peso} Kg</h3>
              <h3>Height: {el.altura} Cm</h3>
              <h3>{el.imc}</h3>  
              <div className='modifyibm'>
       <a href='/calculatorimc'>Modify IBM</a>
     </div>             
            </div>
          )  
        })}

    


    { !profile.length?<div className='profiledetalles2'>
              
    <div className="userimage">
        {loading ? (<h3>Loading picture...</h3>) : (<img className="userimage1"src={image} />)}
        
        
        <div className='userinfo'>
     
        <div className='upload1'>
            
            <input className='upfiled' type="file" name="file" placeholeder="Profile Picture" onChange={uploadImage} ></input>
          </div>
     </div>
        
        
        <div className='postImgSave'>
          <button  className='btn btn-secondary'  onClick={postImg}>Save Image</button>
      </div>
    </div>
          
          </div>:
        profile.map((el) => {
            
          return (
            <div className='profiledetalles2'>
              <div className="userimage">
        {loading ? (<h3>Loading picture...</h3>)  : image2.length? (<img className="userimage1"src={image} />) : (<img className="userimage1"src={el.imgperfil} />)}
        

        <div className='userinfo'>
     
     <div className='upload1'>
        
         <input className='upfiled' type="file" name="file" placeholeder="Profile Picture" onChange={uploadImage} ></input>
       </div>
       
  </div>

        
        <div className='postImgSave'>
          <button  className='btn btn-secondary'  onClick={postImg}>Save Image</button>
      </div>
    </div>
                            
            </div>
            
          )  
        })}
    


    

    
      </div>
<div className='averche'>
     <div className='profileprincipal'>
      
    

     
    

    {/* { !profile.length?<div className='profiledetalles'>
    <h2>User Information:</h2>
              <h3>Peso: 0 Kg</h3>
              <h3>Height: 0 Cm</h3>
              <h3>IBM: 0</h3>
              
    <div className="userimage">
        {loading ? (<h3>Loading picture...</h3>) : (<div><img className="userimage1"src={image}/></div>)}
          <div>
            <button  className='saveimageprofile'  onClick={postImg}>Save Image</button>
          </div>
            <div className='upload1'>
            <input className='upfiled' type="file" name="file" placeholeder="Profile Picture" onChange={uploadImage}></input>
          </div>
    </div>
          
          </div>:
        profile.map((el) => {
            
          return (
            <div className="userimage">

        {loading ? (<h3>Loading picture...</h3>) : (<img className="userimage1"src={el.imgperfil} />)}

            
          </div>
          )  
        })}


    <div className='userinformation'>
     { !profile.length?<div className='profiledetalles'>
              <h2>User Information:</h2>
              <h3>Peso: 0 Kg</h3>
              <h3>Height: 0 Cm</h3>
              <h3>IBM: 0</h3>

              <button className="modifyibmbtn">
                <a className="btn btn-primary" href='/calculatorimc'>Modify your IBM</a>
              </button>
          
          </div>:
        profile.map((el) => {
            
          return (
            <div className='userinformation'>
            <div className='profiledetalles'>
              <h2>User Information:</h2>
              <h3>Peso: {el.peso} Kg</h3>
              <h3>Height: {el.altura} Cm</h3>
              <h3>IBM: {el.imc}</h3>   

                <button className="modifyibmbtn">
                  <a className="btn btn-primary" href='/calculatorimc'>Modify your IBM</a>
                </button> 
            </div>
            </div>
          )  
        })}
     </div> */}


     

        <div className='mylists'>
          <div className='name-list'>
              <h2>My Lists</h2>
              <NewList
              onCreate={onCreate}/>
          </div>
      {(favList.length>0)?
      favList.map(f =>(<>
      <FavoriteList
      key = {f.id}
      user= {user}
      list={f}
      onUpdate={handleUpdate}
      onDelete={handleDelete} 
      onRender={handleRenderList}/></>
      ))
    : null}
    </div>
    
        <div className="selectyourlist">
            {(Object.entries(list).length>0)? 
            <List  
            onDeleteRecipe={onDeleteRecipe}
            list={list}
            />:(
              <h2>select your list</h2>
            )}
        </div>

        <div className='yourpost' >
          <h3>The post you Reviewed</h3>
          <div className="yourpostlist">
        {userPost.length>0?
          userPost.map(post=>{
        return(
          <UserPost
          post={post} 
          />
        )
      }) :null}
        </div>
      </div>
      
        </div>
        </div>
    </div>
  )
}

export default UserProfile

