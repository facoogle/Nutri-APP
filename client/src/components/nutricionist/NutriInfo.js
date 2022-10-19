import React from 'react'

const NutriInfo = ({nutri}) => {
console.log(nutri)
  return (
    <div key={nutri.id}>
      <h3>{nutri.username}</h3>
      <h4>{nutri.email}</h4>
      <img src={nutri.image}></img>
    </div>
  )
}

export default NutriInfo
