import React, { useState } from 'react';
import base_url from '../config/config';
import axios from 'axios'
import { Link } from 'react-router-dom';

const Form = () => {
    const [data, setData]=useState({
        fullName:'',
        email:'',
        message:'',
    });
    const [errors, setErrors]=useState({});

    const inputHandler = (e) =>{
       const { id, value } = e.target;
       setData((pre)=>({
         ...pre,
         [id]:value
       }))
    }

    const validate = () => {
        const newErrors = {};
      
        if (!data.fullName.trim()) {
          newErrors.fullName = "Full name is required.";
        }
      
        if (!data.email.trim()) {
          newErrors.email = "Email is required.";
        } else if (!/\S+@\S+\.\S+/.test(data.email)) {
          newErrors.email = "Email format is invalid.";
        }
      
        if (!data.message.trim()) {
          newErrors.message = "Message is required.";
        }
    
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
      };
      

    const submitHandler = (e) =>{
        e.preventDefault();
        if (validate()) {
            axios.post(`${base_url}/api/form`,{data})
            .then((res)=>{
              //console.log(res);
              if(res.data.status==='success'){
                setData({
                    fullName:'',
                    email:'',
                    message:'',
                });
              }else{
                setErrors({ message : res.data.error});
              }
            })
            .catch((err)=>{
                console.error(err);
                setErrors({ message :'Something went wrong try again...'});
            }) 
        }
    }

    return (
        <section className='flex justify-center items-center h-screen bg-black/20'>
            <form className="w-lg mx-auto bg-white p-10 rounded-2xl shadow-md" onSubmit={submitHandler}>
                <div className="relative z-0 w-ful group">
                    <input value={data.fullName} onChange={inputHandler} type="text" id="fullName" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-black focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" "  />
                    <label htmlFor="fullName" className="peer-focus:font-medium absolute text-sm text-gray-900 dark:text-gray-700 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-black  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Full Name *</label>
                </div>
                {errors.fullName && <p className="text-red-500 text-sm">{errors.fullName}</p>}
                <div className="relative z-0 w-full group mt-5">
                    <input value={data.email} type="email" onChange={inputHandler} id="email" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-black focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" "  />
                    <label htmlFor="email" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-700 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-black  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Email *</label>
                </div>
                {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
                <div className="relative z-0 w-full group mt-5">
                    <textarea  id='message' onChange={inputHandler} className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-black focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" ">
                        {data.message}
                    </textarea>
                    <label htmlFor="message" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-700 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-black  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Message</label>
                </div>
                {errors.message && <p className="text-red-500 text-sm">{errors.message}</p>}
                <button type="submit" className="text-white bg-black focus:ring-4 focus:outline-none cursor-pointer font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center mt-5">Submit</button>

                <div className='flex justify-center my-4'>
                  <Link to='/' className=''>View Data</Link>
                </div>
            </form>
        </section>
    )
}

export default React.memo(Form);