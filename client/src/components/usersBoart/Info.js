import React from 'react'
import "./Info.css"
import imgfree from "./images/ButtonFree.png"
import imgpremium from "./images/ButtonPremium.png"

const Info = ({user}) => {

  return (
    <div>
      <h2 className="usernamecss">{user.username}</h2>
      {user.premium?<img className="buttonPremium" src={imgpremium}></img>:<img className='buttonPremium' src={imgfree}></img>}
      
    </div>
  )
}

export default Info
