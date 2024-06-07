import React, { useEffect } from 'react'
import { Link, useLocation, useNavigate } from "react-router-dom";


const Navbar = () => {
  let location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    console.log(location.pathname)
  }, [location]);
  const logOut = () => {
    localStorage.removeItem('token');
    navigate("/login")

  }
 
  return (


    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark   ">
        <div className="container-fluid">
          <Link className="navbar-brand" to="#">iNoteBook</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className={`nav-link ${location.pathname === "/" ? "active" : ""}`} aria-current="page" to="/">Home</Link>
              </li>
              <li className="nav-item">
                <Link className={`nav-link ${location.pathname === "/about" ? "active" : ""}`} to="/about">about</Link>
              </li>

            </ul>
            {!localStorage.getItem('token') ?
              <form className="d-flex mx-3">
                <Link className="btn btn-primary" to={'/login'} role="button">login</Link>
                <Link className="btn btn-primary mx-4" to={'/signup'} role="button">Signup</Link>
              </form>
              : <button onClick={logOut} className="btn btn-primary mx-4" role="button">logout</button>
            }

          </div>
        </div>
      </nav>
    </>
  )
}

export default Navbar
