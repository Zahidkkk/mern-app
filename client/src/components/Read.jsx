import React from 'react'
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function Read() {

const [data, setData] = useState();
const [error, setError] = useState();

//function to fetch data and show on all post
async function getData() {
  const response = await fetch('http://localhost:5000')
  const result = await response.json();
  //console.log("result",result);

  if(!response.ok){
    setError(result.error);
  }
  if (response.ok){
    setError("");
    setData(result)
  }
}


//function for deleting item
const handleDelete = async(id) =>{
    
  const response = await fetch(`http://localhost:5000/${id}`,{
    method:"DELETE"
  });

  const result = await response.json();

  if(!response.ok){
    setError(result.error);
  }
  if (response.ok){
    setError("Deleted successfully");
    
    setTimeout(()=>{
     setError("");
     getData();
    },2000);
  }
};
useEffect(()=>{
  getData();
},[]);

console.log(data)

  return (
    <div className='container my-2 '>
      {error&&<div className="alert alert-danger"></div>}
      <h2 className='text-center mb-5'>All Post</h2>
      <div className='row'>
        {data?.map((ele)=>(
        <div key={ele._id} className='col-3'>
        <div className="card mb-5" >
           <div className="card-body">
           <h5 className="card-title">{ele.name}</h5>
           <h5 className="card-title">{ele.email}</h5>
           <h5 className="card-subtitle mb-2">{ele.age}</h5>
           <Link to={`/${ele._id}`} className="btn btn-primary m-2" type="Edit">Edit</Link>
           <button className="btn btn-primary m-2" type="Delete" onClick={()=>handleDelete(ele._id)}>Delete</button>
           </div>
          </div>
        </div>
        ))}
      </div>
    </div>
  )
}

export default Read