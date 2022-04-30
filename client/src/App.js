import axios from "axios";
import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import Login from "./components/Login";
import Register from "./components/Register";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  
  
  const setAuth = (boolean) => {
    setIsAuthenticated(boolean)
  }


  const isAuth = async () => {
    try {
      if(localStorage.token){
        const headers = {
          headers: {'token': localStorage.token}
        }
        const response = await axios.get('http://localhost:3001/auth/verify', headers)
        response.data? setIsAuthenticated(true): setIsAuthenticated(true);
      }
    } catch (error) {
      console.error(error.message);
    }
  }

  useEffect(()=>{
    isAuth();
  },[]);
  
  return (
    <React.Fragment>
      <Routes>
        <Route exact path="/dashboard" element={isAuthenticated?<Dashboard  setAuth={setAuth}/>:<Navigate to='/login'/>} />
        <Route exact path="/login" element={isAuthenticated?<Navigate to='/dashboard'/>:<Login setAuth={setAuth}/>} />
        <Route exact path="/register" element={isAuthenticated?<Navigate to='/login'/>:<Register  setAuth={setAuth}/>} />
      </Routes>
    </React.Fragment>
  );
}

export default App;
