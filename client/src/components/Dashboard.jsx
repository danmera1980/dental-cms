import React, {Fragment, useState, useEffect} from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Dashboard({setAuth}) {

    const [name, setName] = useState("");

    const getName = async ()=>{
        const headers = {
            headers: {'token': localStorage.token}
        }
        try {
            const response = await axios.get("http://localhost:3001/dashboard/", headers);
            setName(response.data.name)
        } catch (error) {
            console.log(error.message);
        }
    }

    useEffect(()=> {
        getName();
    },[]);

    const logout = (e) => {
        e.preventDefault();
        localStorage.removeItem("token");
        setAuth(false);
        toast.success("Logged out successfully")
    }
  return (
    <Fragment>
        <ToastContainer />
        <h1>Dashboard</h1>
        <h2>Hi {name}!</h2>
        <button className='btn btn-primary' onClick={e => logout(e)}>Logout</button>
    </Fragment>
  )
}
