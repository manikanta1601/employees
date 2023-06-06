import React, { useEffect, useState, useContext } from 'react'
import {loginContext} from '../../context/loginContext'
import { useNavigate } from 'react-router-dom';
import {useForm} from "react-hook-form";


function Login() {
  let navigate=useNavigate()
    let {register,handleSubmit,formState:{errors}}=useForm();

    let [currentUser,error,userLoginStatus,loginUser,logoutUser,role]=useContext(loginContext)
    // let [err,setErr]=useState("")
    let handleUserLogin=(userobj)=>{
     
     loginUser(userobj)

    }
    useEffect(()=>{
if(userLoginStatus==true && role=="admin"){
  navigate("/add-user")
}
else if(userLoginStatus==true){
  navigate("/emp-dashboard")
}
    },[userLoginStatus])
  return (
    <div className='text-center'>
      {error?.length!==0 && <p className='text-danger display-1'> {error}</p>}
  <form onSubmit={handleSubmit(handleUserLogin)}>
            <div>
              <label htmlFor="username" className="form-label">
                UserName
              </label>
              <input
                type="text"
                id="username"
                className="form-control bg-light w-50 m-auto"
                {...register("username", {
                  required: true,
                  minLength: 4,
                  maxLength: 22
                })}
              ></input>
              {errors.username?.type === "required" && (
                <p className=" text-danger">*enter your first name</p>
              )}
              {errors.username?.type === "minLength" && (
                <p className=" text-danger">
                  *minimum 4 letter word is required
                </p>
              )}
              {errors.username?.type === "maxLength" && (
                <p className=" text-danger">
                  *maximum 22 letter word is required
                </p>
              )}
            
            </div>

            <div>
            <label htmlFor='password' className='form-label'>password</label>
                <input type="password" id='password'  className='form-control bg-light w-50 m-auto'
                 {...register("password",{required:true,minLength:4})}>

                 </input>
                {
                    errors.password?.type==="required" && <p className=' text-danger'>*enter your password</p>
                }
                {
                    errors.password?.type==="minLength" && <p className=' text-danger'>*minimum 4 password word is required</p>
                }
                
                
            </div>
            
            <button
              type="submit"
              
              className="btn btn-primary p-2 d-block m-auto mt-5"
            >
              Login
            </button>
          </form>
    </div>
  )
}

export default Login