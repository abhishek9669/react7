import axios from "axios";
import React, { useEffect, useState } from "react";
import FileUpload from "./FileUpload";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const config2 = require("./config2.json");

export default function Login() {
  const [data1, setData1] = useState({
    identifier: "",
    password: "",
  });

  const[user,setUser]= useState({
    user:null,
    is_login:false,
  });
  


 
  useEffect(()=>{
    let user = localStorage.getItem("user");
    console.log(user);

    if(user){
      setUser({
        ...user,
        is_login:true,
      })

    }else{
      setUser({
        ...user,
        is_login:false,
      })

    }
  },[])
  

  let handleChange = (e) => {
    console.log(e.target.classList.contains("a_username"));
    if (e.target.classList.contains("a_username")) {
      console.log(e.target.value);
      setData1({
        ...data1,

        identifier: e.target.value,
      });
    }
    if (e.target.classList.contains("a_password")) {
      console.log(e.target.value);

      setData1({
        ...data1,

        password: e.target.value,
      });
      console.log(data1);
    }
  };
  let login = async (e) => {
    e.preventDefault();

    try {
      let { data } = await axios.post(`${config2.dev_api_url}/api/auth/local`, {
        identifier: data1.identifier,
        password: data1.password,
      });
      toast("user login  Successfully")

      console.log(data);

      setUser({
        is_login:true
      })

      localStorage.setItem("user", JSON.stringify(data));
    } catch (error) {
      console.log(error);
    }

    //localStorage.setItem('user',JSON.stringify(data))
  };
  return (
    <>
      <h1 className="text-center">Login Form</h1>
      <form
        className="w-50 offset-3"
        onSubmit={(e) => {
          login(e);
        }}
      >
        <div>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Email address
            </label>
            <input
              type="email"
              className="form-control a_username"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              name="identifier"
              onChange={(e) => {
                handleChange(e);
              }}
            />
            <div id="emailHelp" className="form-text">
              We'll never share your email with anyone else.
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control a_password"
              id="exampleInputPassword1"
              name="password"
              onChange={(e) => {
                handleChange(e);
              }}
            />
          </div>

          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </div>
      </form>
      <br />
      <br />
      <br />
     
      <ToastContainer />

      {
        user.is_login && 
        <FileUpload />

      }

      
    </>
  );
}
