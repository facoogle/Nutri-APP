import React from 'react'
import "./Info.css"

const Info = ({user}) => {

  return (
    <div>
      <h2 className="usernamecss">{user.username}</h2>
    </div>
  )
}

export default Info
