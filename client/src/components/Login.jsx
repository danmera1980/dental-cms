import React, {Fragment, useState} from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Login({setAuth}) {

    const [inputs, setInputs] = useState({
        email: "",
        password: ""
    });

    const {email, password} = inputs;

    const onChange = (e)=>{
        setInputs({
            ...inputs, 
            [e.target.name]: e.target.value
        });
    }

    const onSubmitForm = async (e)=>{
        e.preventDefault();
        try {
            const body = {email, password}
            const response = await axios.post("http://localhost:3001/auth/login", body)
            // console.log(response.data);
            if(response.data.token){
                localStorage.setItem("token", response.data.token);
                toast.success("Login Successfully!");
                setAuth(true);
            } else {
                setAuth(false)
            }
        } catch (error) {
            toast.error(error.response.data)
            console.log(error);
        }
    }

  return (
    <Fragment>
        <h1 className='text-center my-5'>Login</h1>
        <ToastContainer />
        <form onSubmit={onSubmitForm}>
            <input className='form-control my-3' type="email" name='email' placeholder='E-mail' value={email} onChange={e => onChange(e)}/>
            <input className='form-control my-3' type="password" name='password' value={password} onChange={e => onChange(e)}/>
            <button className='btn btn-success btn-block'>Submit</button>
        </form>
        <Link to={"/register"}>Register</Link>
    </Fragment>
  )
}
