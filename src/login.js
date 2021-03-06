import 'bootstrap/dist/css/bootstrap.css';
import React from 'react';
import { useEffect, useRef, useState } from "react";
import axios from 'axios';
import qs from 'qs';
import { useNavigate } from 'react-router-dom';



const Login = () => {
  const navigate = useNavigate();
  const [username,setUsername] = React.useState('');
  const [password,setPassword] = React.useState('');
  const [user, setUser] = React.useState();
  
  useEffect(() => {
    const loggedInUser = localStorage.getItem("user");
    if (loggedInUser) {
      const foundUser = loggedInUser;
      setUser(foundUser);
    }
  }, []);

  const onSubmit = async e => {
    e.preventDefault();
    const user = {username, password};
    try {
      let response = await axios.post('http://localhost:3000/login', qs.stringify(user));
      if(response.status === 200) {
      setUser(response.data.payload);
      localStorage.setItem('username', username);
      localStorage.setItem('user', response.data.payload);
      console.log(response.data.payload);
      return navigate(`/${response.data.payload}`);
      }
    } catch(err) {
      console.log(err);
    }
  }
    return (
        <div className='landing-container'>
            <form
                onSubmit={onSubmit}>
                <input
                    value={username}
                    onChange={e => setUsername(e.currentTarget.value)}
                    type='text'
                    placeholder='Username'
                    className='form-control'
                    id='inputUsername1'/>
                <input
                    value={password}
                    onChange={e => setPassword(e.currentTarget.value)}
                    type='password'
                    placeholder='Password'
                    className='form-control'
                    id='inputPassword1'/>
                <button type='submit' className='btn btn-primary'>login</button>
            </form>
        </div>
    );
};

export default Login;