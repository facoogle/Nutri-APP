import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getInfoNutri, getRecipesNutri } from '../../redux/actions/recipeactions'
import RecipeCreated from '../../components/nutricionist/RecipeCreated'
import { NavBar } from '../../components/utils/nav/nav'
import { useParams } from 'react-router-dom'
import NutriInfo from '../../components/nutricionist/NutriInfo'

const NutriProfile = () => {
  
  const {id} = useParams()
  const dispatch = useDispatch()
  const {nutri} = useSelector((state) => state.user)
  const {recipesN} = useSelector((state) => state.user)
  useEffect(()=>{
    dispatch(getInfoNutri(id))
    dispatch(getRecipesNutri(id))
  }, [])
    return (
    <div>
      <NavBar />
      <NutriInfo nutri={nutri} />
      <h3>Recipes created by the nutricionist</h3>
      {recipesN? recipesN.map(r=>
      <RecipeCreated recipes={r} />
      )
      : <h4>This nutritionist doesn't have any published recipes </h4>
        
      }
    </div>
  )
}

export default NutriProfile
