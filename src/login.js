import 'bootstrap/dist/css/bootstrap.css';
import React from 'react';
import { useEffect, useRef, useState } from "react";
import crypto from 'crypto-js';
import axios from 'axios';

const Login = () => {
  const [username,setUsername] = React.useState('');
  const [password,setPassword] = React.useState('');
  const [user, setUser] = React.useState();
  const secret = 'testtesttesttest';

  const encrypt = (string) => { 
    return crypto.AES.encrypt(string, secret).toString();
  };
  // const decrypt = (encryption) => {
  //   let bytes = crypto.AES.decrypt(encryption, secret);
  //   let originalText = bytes.toString(crypto.enc.Utf8);
  //   return originalText;
  // };
  useEffect(() => {
    const loggedInUser = localStorage.getItem("user");
    if (loggedInUser) {
      const foundUser = JSON.parse(loggedInUser);
      setUser(foundUser);
    }
  }, []);

  const onSubmit = async e => {
    e.preventDefault();
    const user = {username, password};
    try {
      let response = await axios.post('http://localhost:3000/login', user);
      setUser(response.data);
      console.log(user);
      localStorage.setItem('user', response.data);
    } catch(err) {
      console.log(err);
      console.log(err.request);
      console.log(user);
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