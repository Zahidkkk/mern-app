import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useHistory } from 'react-router-dom';

function Create() {

const [name, setName] = useState("");
const [email, setEmail] = useState("");
const [age, setAge] = useState(0);
const [error,setError] = useState("")

//to navigate data from create post to all post

const navigate = useNavigate();

//console.log(name,email,age)

const HandleName = (e) =>{
  setName(e.target.value);
}

const HandleEmail = (e) =>{
  setEmail(e.target.value);
}

const HandleAge = (e) =>{
  setAge(e.target.value);
}

const handleSubmit = async(e) =>{
  e.preventDefault();

  const addUser = { name, email, age };

  const response = await fetch("http://localhost:5000",{
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(addUser),
  });

  const result  = await response.json();

  if(!response.ok){
    console.log(result.error);
    setError(result.error);
  }

  if(response.ok){
    console.log(result);
    setError("");
    setName("");
    setEmail("");
    setAge(0);
    navigate("/all")

  }
};

  return (
    <div className='container my-2'>

      {error && <div className="alert alert-danger" >{error}</div>}
      <h2 className='text-center'>Enter the data</h2>
      
          <form onSubmit={handleSubmit}>
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

export default Create