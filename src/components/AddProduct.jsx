import axios from 'axios';
import React, { useState } from 'react'

function AddProduct({handlePost}) {
    let [product,setProduct]=useState({});

   let handleChange=(e)=>{
        let {name,value}=e.target;
        setProduct({...product,[name]:value})
    }

    let handleSubmit=(e)=>{
        e.preventDefault();
        handlePost();
        setProduct({});
    }
   
  return (
   <>
   <div className='container mx-auto w-50 mt-5'>
    <form onSubmit={handleSubmit}>
  <div className="mb-3">
    <label for="exampleInputEmail1" className="form-label" >Title</label>
    <input type="text"  className="form-control" name='title' onChange={ handleChange}/>
  </div>
  <div className="mb-3">
    <label for="exampleInputPassword1" className="form-label">Price</label>
    <input type="text" className="form-control" name='price' onChange={ handleChange}/>
  </div>
  <div className="mb-3">
    <label for="exampleInputPassword1" className="form-label">Image Url</label>
    <input type="text" className="form-control" name='url' onChange={ handleChange}/>
  </div>
  <button type="submit" className="btn btn-primary">Submit</button>
</form>
</div>
   </>
  )
}

export default AddProduct
