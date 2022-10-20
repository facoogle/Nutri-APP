import React from 'react'
import "./UserPost.css"

const UserPost = ({post}) => {
    return (
    <div className='posts col'>
      <div className="postcontainer">
        <div className='postrecipedata'>      
        <a href={"/detail/" + post.recipeId}  className="Links" >
        <img className="profilepostimage" src={post.recipeImg} alt='recipeImg'></img>
        <div className="postname">
        <h4>{post.recipeName}</h4></div></a>
        </div>
        <div className='postUserdata'>
        <h6>{post.username}:</h6>
            <div className="postcoment">{post.content}</div>
      </div>
      </div>
    </div>
  )
}

export default UserPost
