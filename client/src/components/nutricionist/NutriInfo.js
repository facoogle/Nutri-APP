import React from 'react'
import NutriPFP from './n.png' 


const NutriInfo = ({nutri}) => {
  return (
    <div key={nutri.id} className='nutriInfo'>
      <h3>{nutri.username}</h3>
      <h4>{nutri.email}</h4>
      <img src={NutriPFP} className='imagenNutri'></img>
    </div>
  )
}

export default NutriInfo
