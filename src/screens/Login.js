import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const API_URL = process.env.REACT_APP_API_URL;


export default function Login() {

  const [credentials, setcredentials] = useState({ email: "", password: "" })

  let navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(JSON.stringify({ email: credentials.email, password: credentials.password }))
    const response = await fetch(`${API_URL}/api/loginuser`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email: credentials.email, password: credentials.password })
    });

    const json = await response.json();
    console.log(json);

    if (!json.success) {
      alert("Enter valid Credentials ")
    }

    else {
      localStorage.setItem("userEmail", credentials.email);
      localStorage.setItem("authToken", json.authToken);
      console.log(localStorage.getItem("authToken"))
      navigate("/");
    }

  }

  const onChange = (event) => {
    setcredentials({ ...credentials, [event.target.name]: event.target.value })
  }

  return (
    <>
      <div className='container'>
        <div style={{
          fontSize: "1.5rem",
          fontWeight: "600",
          textAlign: "center",
          marginBottom: "1.5rem",
          color: "#333"
        }}>
          Log in to your account
        </div>
        <form onSubmit={handleSubmit}>

          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
            <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" name='email' value={credentials.email} onChange={onChange} />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
            <input type="password" className="form-control" id="exampleInputPassword1" name='password' value={credentials.password} onChange={onChange} />
          </div>

          <button type="submit" className="m-3 btn btn-primary">Submit</button>
          <Link to="/createuser" className="m-3 btn btn-danger">New User</Link>
        </form>
      </div>
    </>
  )
}
