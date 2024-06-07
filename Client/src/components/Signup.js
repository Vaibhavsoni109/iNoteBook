import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const navigate = useNavigate();
  const [credentials, setcredential] = useState({name:"" ,email: "", password: "",cpassword:"" });
  const onChange=(e)=>
  {
    e.preventDefault();
    setcredential({ ...credentials, [e.target.name]: e.target.value })
    
  }

  const handleSubmit = async (e) => {
    const {name,email,password}=credentials;
    e.preventDefault();

    const response = await fetch("https://inotebook-rm2s.onrender.com/api/auth/createuser", {
      method: "POST", // *GET, POST, PUT, DELETE, etc.

      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({name, email, password})
    });
    const json = await response.json();
    console.log(json);
    if (json.success) {
      //save the authtoken and redirect
      localStorage.setItem('token', json.authtoken)
      navigate('/login')

    }
    else {
      alert("invalid credential");
    }

  }


  return (
    <div>
      <div className='container' style={{ maxWidth: "50%" }}>
    <form onSubmit={handleSubmit}>
    <div className="mb-3">
        <label htmlFor="name" className="form-label">Full Name</label>
        <input type="text" className="form-control" name='name' id="name" onChange={onChange} value={credentials.name} />
      </div>
      <div className="mb-3">
        <label htmlFor="email" className="form-label">Email address</label>
        <input type="email" className="form-control" id="email" name='email' aria-describedby="emailHelp" onChange={onChange} value={credentials.email} />
        <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
      </div>
      <div className="mb-3">
        <label htmlFor="password" className="form-label">Password</label>
        <input type="password" className="form-control" name='password' id="password" onChange={onChange} value={credentials.password} minLength={5} />
      </div>
      <div className="mb-3">
        <label htmlFor="cpassword" className="form-label">Confirm Password</label>
        <input type="password" className="form-control" name='cpassword' id="cpassword" onChange={onChange} value={credentials.cpassword} />
      </div>
      <button type="submit" className="btn btn-primary">Submit</button>
    </form>
  </div>
    </div>
  )
}

export default Signup
