import React from "react";
import "./register.css"
import {useDispatch} from "react-redux";
import { NavBar } from "../utils/nav/nav";
import {Formik} from "formik"
import { postUser } from "../../redux/actions/useractions";


export const Register = () => {

    const dispacth = useDispatch()
    
    return (
        <div className="register-user">
            <NavBar/>
            <h1>Sign up for Nutri-u</h1>
        <div className="register-Content">
            
            
        <div className="registerBody">
            
        
        

        <Formik
            initialValues={{
                email: "",
                username:"",
                password:"",
                password2:"",
            }}

            validate={(valores)=>{
                let errores = {}

                // Validacion correo
					if(!valores.email){
						errores.email = 'Please enter an email'
					} else if(!/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(valores.email)){
						errores.email = 'Email can only contain letters, numbers, periods, hyphens and underscores.'
					}

                // validacion username
                if(!valores.username){
                    errores.username = "Please, enter an name"
                }else if(!/^[a-zA-ZÀ-ÿ\/^S+]{1,40}$/.test(valores.username)){
                    errores.username = 'The name can only contain letters and spaces'
                }

                //validacion passoword

                if(!valores.password){
                    errores.password = "Please, enter an password"
                }
                // eslint-disable-next-line
                if(valores.password != valores.password2){
                    errores.password2 = "the passwords are different"
                }
            return errores   
            }}


            onSubmit={(valores,{resetForm})=>{
                dispacth(postUser(valores))
            }}
        >
            {( {values,errors,touched,handleSubmit,handleChange,handleBlur} )=>(
                <form className="Form-Register" onSubmit={handleSubmit}>

                <div class="row mb-2">
                    <label  for="inputEmail3" class="col-sm-2 col-form-label">Email</label>
                    <div class="col-sm-10">
                        <input type="email" class="form-control" id="inputEmail3" name="email" value={values.email} onChange={handleChange} onBlur={handleBlur}/>
                        {touched.email && errors.email && <div className="errors">{errors.email}</div>}
                    </div>
                </div>


                <div class="row mb-3">
                    <label  for="inputText" class="col-sm-2 col-form-label">Username</label>
                    <div class="col-sm-10">
                        <input type="text" class="form-control" id="inputText" name="username" value={values.username} onChange={handleChange} onBlur={handleBlur}/>
                        {touched.username && errors.username && <div className="errors">{errors.username}</div>}
                    </div>
                </div>

                <div class="row mb-3">
                    <label  for="inputPassword3" class="col-sm-2 col-form-label">Password</label>
                    <div class="col-sm-10">
                        <input type="password" class="form-control" id="inputPassword3" name="password" value={values.password} onChange={handleChange} onBlur={handleBlur}/>
                        {touched.password && errors.password && <div className="errors">{errors.password}</div>}
                    </div>
                </div>

                <div class="row mb-3">
                    <label  for="inputPassword3" class="col-sm-2 col-form-label">Repeat Password</label>
                    <div class="col-sm-10">
                        <input type="password" class="form-control" id="inputPassword3" name="password2" value={values.password2} onChange={handleChange} onBlur={handleBlur}/>
                        {touched.password2 && errors.password2 && <div className="errors">{errors.password2}</div>}
                    </div>
                </div>

                
                <div className="buttons-register">
                <button type="submit" class="btn btn-primary">Register</button>
                <a className="btn btn-secondary" href="/login">Login</a>
                </div>
            </form>
            )}
            </Formik>
        </div>
        {/* {userRegisted?<h1>{userRegisted}</h1>:null} */}
        
        </div>
        </div>
    )
}