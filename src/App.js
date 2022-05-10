import 'bootstrap/dist/css/bootstrap.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Chat from './chat.js';
import Login from './login.js';
import './App.css';


function App() {
  return (
    <Router>
      <Routes>
        <Route  path='' element={<Login/>} >
        <Route  path='/userId' element={<Chat/>} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
