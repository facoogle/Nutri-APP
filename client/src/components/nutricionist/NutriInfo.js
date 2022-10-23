import React from 'react'
import NutriPFP from './n.png' 
import imgadmin from "./image/adminbutton2.png"
import imgnutritionist from "./image/ButtonNutritionist.png"


const NutriInfo = ({nutri}) => {
  console.log("hola soy nutri", nutri)
  return (
    <div key={nutri.id} className='nutriInfo'>
      <div>
      <h3>{nutri.username}</h3>
      {nutri.admin?<img className="buttonAdmin" src={imgadmin}></img>:<img className='buttonAdmin' src={imgnutritionist}></img>}
      </div>
      <h4>{nutri.email}</h4>
      <img src={NutriPFP} className='imagenNutri'></img>
    </div>
  )
}

export default NutriInfo
