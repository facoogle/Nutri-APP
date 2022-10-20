import React from 'react'


const NutriInfo = ({nutri}) => {
  return (
    <div key={nutri.id} className='nutriInfo'>
      <h3>{nutri.username}</h3>
      <h4>{nutri.email}</h4>
      <img src={nutri.image} className='imagenNutri'></img>
    </div>
  )
}

export default NutriInfo
