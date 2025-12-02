import React, { useContext } from 'react';
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import Login from './UserAuth/Login';
import Signup from './UserAuth/Signup';
import Navbar from './Navbar';
import Home from './Components/Home';
import AllUsers from './Users/AllUsers';
import taskContext from './Context/TaskContext';
import Alert from './Components/Alert';

export default function Routing() {

  const context =  useContext(taskContext);

  const { alertMessage, toShow } = context;

  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/home' element={<Home />} />
          <Route path='/users' element={<AllUsers />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}
