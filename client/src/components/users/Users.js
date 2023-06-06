import React,{useState,useEffect} from 'react'
import axios from 'axios';
import Table from 'react-bootstrap/Table';


const Users = () => {

  let [error,setError]=useState("")
  let [users,setUsers]=useState([])
  let token=sessionStorage.getItem("token")

  useEffect(()=>{
    axios.get("http://localhost:5000/user-api/get-users",{headers:{"Authorization":"Bearer "+token}})
    .then((response)=>
    {    
        if(response.status===200){
          setUsers(response.data.payload)
          
        }
        if(response.status!==200){
           setError(response.data.message)
          
           }
    }
    )
    .catch((err)=>
    {
        if(err.response){
            setError(err.message)
            console.log(err.response)
        }
        else if(err.request){
            setError(err.message)

        }
        else{
            setError(err.message)
        }
    })
  },[])
  
  return (
    <div className='Users'>
      {error?.length!==0 && <p className='text-danger display-1'> {error}</p>}
     
      <Table striped bordered hover size="sm">
      <thead>
        <tr>
          <th>UserName</th>
          <th>Email</th>
          <th>Contact Number</th>
          <th>Department</th>
          <th>Joining date</th>
        </tr>
      </thead>
      <tbody>
      {users.map((user,index)=>
        <tr key={index}>
          <td>{user.username}</td>
          <td>{user.email}</td>
          <td>{user.phone}</td>
          <td>{user.department}</td>
          <td>{user.jod}</td>
        </tr>)}
       
      </tbody>
    </Table>

      
     
    </div>
  )
}

export default Users