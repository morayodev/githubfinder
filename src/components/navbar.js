import React from "react";
import "./Navbar.css";
import {FaGithub} from "react-icons/fa"


function Navbar() {
  return (
    <div className="navbar">
     <p><FaGithub className="git"/>Github</p>
    </div>
  );
}

export default Navbar;
