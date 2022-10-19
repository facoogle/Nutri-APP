import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addFavorite, getLists } from '../../../redux/actions/useractions'
import './SelectFavList.css'

const SelectFavList = ({recipeId}) => {
    const dispatch = useDispatch()
    const {favList} = useSelector((state) => state.user)
    const {list} = useSelector((state) => state.user)
   

  useEffect(()=>{
    dispatch(getLists())
  },[])

  const handleCheck = (event) => {
    if (event.target.checked) {
       dispatch(addFavorite(event.target.value, recipeId))
        // if(!event.target.checked){

        // }
    } 
  };


    return (
    <div className='list-contein'>
        <h3>My favorite list</h3>
        <div className='favList'>
      {favList?
        favList.map((f)=>{
            return(
            <div key={f.id}>
                <input value={f.id} type='checkbox' onChange={handleCheck} />
                <span>{f.name}</span>
            </div>
        )}):null
      }</div>
    </div>
 )
}


export default SelectFavList
