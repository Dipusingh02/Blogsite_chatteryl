import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaRocketchat, FaCaretDown } from "react-icons/fa";
import logo from "../../assets/logo.png";
import "./navbar.css";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userProfile, setUserProfile] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const name = localStorage.getItem("name");
    const userId = localStorage.getItem("userId");

    if (token && name && userId) {
      setIsLoggedIn(true);
      setUserProfile({ id: userId, name: name });
    } else {
      setIsLoggedIn(false);
      setUserProfile(null);
    }
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("name");
    localStorage.removeItem("userId");
    setIsLoggedIn(false);
    setUserProfile(null);
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-logo">
          <img src={logo} alt="logo" />
        </div>
        <div className={`navbar-links ${isOpen ? "show" : ""}`}>
          <ul>
            <li id="center">
              <Link to="/home">Home</Link>
            </li>
          </ul>
        </div>
        <div className="profile">
          {isLoggedIn ? (
            <div className="dropdown">
              <span onClick={toggleDropdown} className="dropdown-toggle">
                {userProfile?.name || "Profile"}
                <FaCaretDown />
              </span>
              {isDropdownOpen && (
                <ul className="dropdown-menu">
                  <li>
                    <Link to="/Upload-blog">Upload Blog</Link>
                  </li>
                  <li>
                    <Link to="/Myblog">Library</Link>
                  </li>
                  <li onClick={handleLogout}>Logout</li>
                </ul>
              )}
            </div>
          ) : (
            <Link to="/login">Login</Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
