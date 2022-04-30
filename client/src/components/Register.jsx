import React, {Fragment, useState} from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Register({setAuth}) {

    const [inputs, setInputs] = useState({
        name: "",
        lastName: "",
        username: "",
        email: "",
        password: ""
    });

    const {name, lastName, username, email, password} = inputs;

    const onChange = (e)=>{
        setInputs({
            ...inputs, 
            [e.target.name]: e.target.value
        });
    }

    const onSubmitForm = async (e)=>{
        e.preventDefault();
        try {
            const body = {name, lastName, username, email, password}
            const response = await axios.post("http://localhost:3001/auth/register", body)
            // console.log(response.data);

            if(response.data.token){
                localStorage.setItem("token", response.data.token);
                toast.success("Successfully Registered")
                setAuth(true);
                
            }
        } catch (error) {
            toast.error(error.response.data)
            console.log(error.message);
        }
    }

  return (
    <Fragment>
        <ToastContainer />
        <h1 className='text-center my-5'>Register</h1>
        <form onSubmit={onSubmitForm}>
            <input className='form-control my-3' type="text" name='name' placeholder='Name' value={name} onChange={e => onChange(e)}/>
            <input className='form-control my-3' type="text" name='lastName' placeholder='Last Name' value={lastName} onChange={e => onChange(e)}/>
            <input className='form-control my-3' type="text" name='username' placeholder='Username' value={username} onChange={e => onChange(e)}/>
            <input className='form-control my-3' type="email" name='email' placeholder='E-mail' value={email} onChange={e => onChange(e)}/>
            <input className='form-control my-3' type="password" name='password' value={password} onChange={e => onChange(e)}/>
            <button className='btn btn-success btn-block'>Submit</button>
        </form>
        <Link to={"/login"}>Login</Link>
    </Fragment>
  )
}
