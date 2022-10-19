import React from 'react'


const RecipeCreated = ({recipes}) => {
  

  return (
    <div className='createdRecipes col'>
        <div className=''>
        <a href={"/detail/" + recipes.id}  className="Links" >
        <img src={recipes.image} alt='recipeImg'></img>
        <h4>{recipes.name}</h4></a>
        </div>
        <div className='recipesDietsdata'>
            <h6>Diets</h6>
            {recipes.diets? recipes.diets.map(d=>{
            return<>
              <span key={d.id}>{d.name}</span>
                </>})
            :<span>This recipe don't have post</span>}
        <div className='recipesPostsdata'>
            <h6>Post</h6>
            {recipes.posts? recipes.posts.map(p=>{
            return<div>
              <span key={p.id}>{p.content}</span>
                </div>})
            :<span>This recipe don't have post</span>}

        </div>
      </div>
    </div>
  )
}

export default RecipeCreated
