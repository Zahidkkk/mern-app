import React from 'react'
import { useState,useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

function Update() {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState(0);
  const [error,setError] = useState("")

  const navigate = useNavigate();

  const HandleName = (e) =>{
    setName(e.target.value);
  }
  
  const HandleEmail = (e) =>{
    setEmail(e.target.value);
  }
  
  const HandleAge = (e) =>{
    setAge(e.target.value);
  }


//take data from backend by id
const {id} = useParams();

const getSingleUser = async () =>{


  const response = await fetch(`http://localhost:5000/${id}`);
  const result = await response.json();

  if(!response.ok){
    //console.log(result.error);
    setError(result.error);
  }

  if(response.ok){
    setError("");
    //console.log('update',result);
    setName(result.name);
    setEmail(result.email);
    setAge(result.age);
  }
}

useEffect(()=>{
  getSingleUser();
},[]);

//function to update data when click on update button
const handleEdit = async(e) =>{
  e.preventDefault();

  const updatedUser = { name, email, age };

  const response = await fetch(`http://localhost:5000/edit/${id}`,{
    method: "PATCH",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(updatedUser),
  });

  const result  = await response.json();

  if(!response.ok){
    console.log(result.error);
    setError(result.error);
  }

  if(response.ok){
    setError("");
    navigate("/all");

  }
};
  return (
    <div className='container my-2'>

      {error && <div className="alert alert-danger" >{error}</div>}
      <h2 className='text-center'>Edit the data</h2>
      
          <form onSubmit={handleEdit} >
            <div className="m-3">
             <label  className="form-label">Name</label>
             <input type="text" 
              className="form-control" 
              value={name}
              onChange={HandleName}/>
           </div>

           <div className="m-3">
            <label  className="form-label">Email address</label>
            <input type="email" 
             className="form-control"
             value={email}  
             onChange={HandleEmail}/>
           </div> 

            <div className="m-3">
            <label  className="form-label">Age</label>
            <input type="Number" 
             className="form-control"
             value={age} 
            onChange={HandleAge}/>
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
          </form>
    </div>
  )
}

export default Update