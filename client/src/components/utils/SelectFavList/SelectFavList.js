import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addFavorite, getLists, removeFavorite } from '../../../redux/actions/useractions'
import './SelectFavList.css'

const SelectFavList = ({recipeId}) => {
    const dispatch = useDispatch()
    const {favList} = useSelector((state) => state.user)
    const {list} = useSelector((state) => state.user)
   
  console.log(favList)
  useEffect(()=>{
    dispatch(getLists())
  },[])


const ListStatus = ({f, recipeId}) =>{
  const [check, setCheck] = useState(false)
  // if(f.includes(recipeId)){
  //   setCheck(true)
  // }
  
  const handleCheck = (event) => {
    if (event.target.checked) {
      setCheck(true)
       dispatch(addFavorite(event.target.value, recipeId))}
    if(!event.target.checked){
      dispatch(removeFavorite(event.target.value, recipeId))
      setCheck(false)
    }

  };
  return(
    <div key={f.id}>
                <input value={f.id} type='checkbox' checked={check} onChange={handleCheck} />
                <span>{f.name}</span>
      </div>
  )
}

    return (
    <div className='list-contein'>
        <h3>My favorite list</h3>
        <div className='favList'>
      {favList?
        favList.map((f)=>{
          console.log(f);
            return(
            <ListStatus f={f} recipeId={recipeId} />
        )}):null
      }</div>
    </div>
 )
}


export default SelectFavList
