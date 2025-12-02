import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import taskContext from '../Context/TaskContext';
import validator from "validator";
import "./UserAuth.css";
import axios from "axios";

export default function Login() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();
  const context = useContext(taskContext);
  const { setUserAuth, setUserEmail, setUserType, setAlertMessage, toggleToShow } = context;

  const handleEmail = (event) => {
    setEmail(event.target.value);
  }

  const handlePassword = (event) => {
    setPassword(event.target.value);
  }

  const loginUser = async () => {
    if (email === "" && password === "") {
      setErrorMessage("enter email and password");
    } else if (email === "") {
      setErrorMessage("enter email");
    } else if (password === "") {
      setErrorMessage("enter password");
    } else {
      if (!validator.isEmail(email)) {
        setErrorMessage("enter a valid email");
      } else if (password.length < 5) {
        setErrorMessage("enter password bigger than 5 characters");
      } else {
        setErrorMessage("");
        // const response = await fetch("http://localhost:5000/tasky/auth/loginuser", {
        // const response = await axios("http://localhost:5000/tasky/auth/loginuser", {
        //   method: "POST",
        //   headers: {
        //     'Content-Type': 'application/json'
        //   },
        //   body: JSON.stringify({ email, password })
        // });

        const response = await axios.post(
          "http://localhost:5000/tasky/auth/loginuser",
          { email, password }, // request body
          {
            headers: {
              "Content-Type": "application/json"
            }
          }
        );


        const json = await response.data;

        if (json.success) {
          setErrorMessage(json.message);
          setUserType(json.user.role);
          //toggleToShow(true);
          //setAlertMessage("User logged in succesfully...");
          setTimeout(() => {
            if (json.user.role === "admin") {
              navigate("/home");
            } else if (json.user.role === "normal") {
              navigate('/normal');
            }
            setUserAuth(json.authToken);
            setUserEmail(email);
            //toggleToShow(false);
            //setAlertMessage("");
          }, 1500);
        } else {
          setErrorMessage(json.message);
        }
      }
    }
  }

  return (
    <div className="userlogin">
      <h1 style={{
        // marginLeft: "12%",
        marginTop: "5%"
      }}>User Login</h1>
      <div className='login'>
        <div className="mb-3">
          <label style={{ fontWeight: "bolder" }} for="exampleInputEmail1" className="form-label">Email address</label>
          <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" value={email} onChange={handleEmail} placeholder='email' />
        </div>
        <div className="mb-3">
          <label style={{ fontWeight: "bolder" }} for="exampleInputPassword1" className="form-label">Password</label>
          <input type="text" className="form-control" id="exampleInputPassword1" value={password} onChange={handlePassword} placeholder='password' />
        </div>

        <p style={{
          fontWeight: "bolder",
          color: "red"
        }}>{errorMessage}</p>

        <button type="submit" className="btn btn-warning loginButton" onClick={loginUser}>Login</button>
      </div>
    </div>
  )
}

