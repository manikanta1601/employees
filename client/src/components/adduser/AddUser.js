import axios from 'axios';

import React from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Table from 'react-bootstrap/Table';

import {useForm} from "react-hook-form"

const AddUser = () => {
    let [error,setError]=useState("")
    let {register,handleSubmit,formState:{errors}}=useForm();
    const navigate=useNavigate()
 
    let formSubmit=(newUser)=>{
 
        newUser={...newUser,role:"employee"}
     
     axios.post("http://localhost:5000/user-api/add-user",newUser)
     .then((response)=>
     {
         if(response.status===201){
          navigate("/users")
         }
         if(response.status!==201){
            setError(response.data.message)
           
            }
     }
     )
     .catch((err)=>
     {
         if(err.response){
             setError(err.message)
             
         }
         else if(err.request){
             setError(err.message)
 
         }
         else{
             setError(err.message)
         }
     })
 
 
    }
  
   return (
 
     <div className='card w-auto h-auto '>
        
         <div className='card-body p-3 m-3'>
             <h3 className='display-6'>Add new employee</h3>
             {/* first row for username */}
     {error?.length!==0 && <p className='text-danger display-1'> {error}</p>}
 
             <form  onSubmit={handleSubmit(formSubmit)}>
           <div className='row row-cols-1 row-cols-sm-2'>
             <div className='col'>
                 <label htmlFor='username'  className='form-label'>User Name</label>
                 <input type="text" id='username'  className='form-control bg-light' 
                 {...register("username",{required:true,minLength:4,maxLength:10})}
                 ></input>
                 {
                     errors.username?.type==="required" && <p className=' text-danger'>*enter your first name</p>
                 }
                 {
                     errors.username?.type==="minLength" && <p className=' text-danger'>*minimum 4 letter word is required</p>
                 }
                 {
                     errors.username?.type==="maxLength" && <p className=' text-danger'>*maximum 6 letter word is required</p>
                 }
 
             </div>
             <div className='col'>
             <label htmlFor='password' className='form-label'>password</label>
                 <input type="password" id='password'  className='form-control bg-light'
                  {...register("password",{required:true,minLength:4})}>
 
                  </input>
                 {
                     errors.password?.type==="required" && <p className=' text-danger'>*enter your password</p>
                 }
                 {
                     errors.password?.type==="minLength" && <p className=' text-danger'>*minimum 4 password word is required</p>
                 }
                 
                 
             </div>
           </div>
           {/* second row for date of birth  */}
           <div className='row row-cols-1 row-cols-sm-2'>
             <div className='col'>
                 <label htmlFor='jod'  className='form-label'>joining date</label>
                 <input type="date" id='jod'  className='form-control bg-light' {...register("jod",{required:true})}></input>
                 {errors.jod?.type==="required" && <span className='text-sm text-danger'>*joining date is required</span>}
             </div>
             <div className='col'>
                 <label htmlFor='department'  className='form-label'>Department</label>
                 <input type="text" id='department'  className='form-control bg-light'{...register("department",{required:true})} ></input>
                 {
                     errors.department?.type==="required" && <p className=' text-danger'>*enter your department</p>
                 }
             </div>
           </div>
           {/* third row  contains Email and Phone Number*/}
           <div className='row row-cols-1 row-cols-sm-2'>
             <div className='col'>
                 <label htmlFor='email'  className='form-label'>Email</label>
                 <input type="email" id='email'  className='form-control bg-light'{...register("email",{required:true})} ></input>
                 {
                     errors.email?.type==="required" && <p className=' text-danger'>*enter your valid email id</p>
                 }
             </div>
             <div className='col'>
             <label htmlFor='phone' className='form-label'>Phone Number</label>
                 <input type="number" id='phone' className='form-control bg-light' {...register("phone",{required:true,maxLength:11})}  ></input>
                 {
                     errors.phone?.type==="required" && <p className=' text-danger'>*enter your Phone number</p>
                 }
                 {
                     errors.phone?.type==="maxLength" && <p className=' text-danger'>*maximum number length should be 10</p>
                 }
             </div>
           </div>
           
           <button type='submit' className='btn btn-primary p-2 d-block ms-auto mt-5'>Submit</button>
           
           </form>
         </div>
         
         
     </div>)
}

export default AddUser