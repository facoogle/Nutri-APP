import React from 'react'
import img from "./logo";


const LoggedUser = (user) => {
    const renderPages = (user) =>{
        if (user.free) {}
        if(user.premium){
                return(<>
                <li class="nav-item"> <a class="nav-link" href="/">Home</a></li>
                <li class="nav-item "> <a class="nav-link" href="/me">Profile</a></li>
                <li class="nav-item "> <a class="nav-link" href="/calculatorimc">Calculator IMC</a></li>
                </>)
        }else if(user.admin){
            return(<>
            <li class="nav-item"> <a class="nav-link" href="/">Home</a></li>
            <li class="nav-item "> <a class="nav-link" href="/createrecipe">Create Recipe</a></li>
            <li class="nav-item "> <a class="nav-link" href="/me">Profile</a></li>
            <li class="nav-item "> <a class="nav-link" href="/admin/users">Users Info</a></li>
            <li class="nav-item "> <a class="nav-link" href="/admin/register">New Admin</a></li>
            <li class="nav-item "> <a class="nav-link" href="/admin/recipes">Recipe Info</a></li>
            </>)
        }else if(user.nutricionist) {
            return(<>
            <li class="nav-item"> <a class="nav-link" href="/">Home</a></li>
            <li class="nav-item "> <a class="nav-link" href="/me">Profile</a></li>
            <li class="nav-item "> <a class="nav-link" href="/createrecipe">Create Recipe</a></li>
            </>)
        }else {
            return(<>
            <li class="nav-item"> <a class="nav-link" href="/">Home</a></li>
            <li class="nav-item "> <a class="nav-link" href="/me">Profile</a></li>
            <li class="nav-item "> <a class="nav-link" href="/suscription">Subscribe!</a></li>
            <li class="nav-item "> <a class="nav-link" href="/calculatorimc">Calculator IMC</a></li>
            </>)
        }
        
    }
  return (<>
        { renderPages(user) }
  </>)
}

export default LoggedUser
