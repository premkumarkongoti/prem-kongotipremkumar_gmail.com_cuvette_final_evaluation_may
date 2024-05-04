import React, { useState, useRef } from 'react';
import styles from './Login.module.css'
import crossIcon from '../../assets/close.png'
import axios from 'axios';
import toast from "react-hot-toast";
import { FaEyeSlash } from "react-icons/fa6";
import { FaEye } from "react-icons/fa";



function Login({onClose, setIsLoggedIn, setUserName}) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");


  //const [showModal, setShowModal] = useState(true);

  // const handleCloseModal = () => {
  //   setShowModal(false);
  // };

 // const modalRef = useRef(null);

 const handleSubmit = async (event) => {
  event.preventDefault();

  try {
    const response = await axios.post('http://localhost:5000/api/auth/login', {
      username,
      password,
    });
    
    // Assuming the backend responds with a token upon successful login
    const token = response.data.token;

    // Perform actions based on successful login, such as saving token to localStorage
    localStorage.setItem('accessToken', token);

    setIsLoggedIn(true); 
    setUserName(username);
    
    
    // Close the login modal
    onClose();
    toast.success("Logged in successfully!");
  } catch (error) {
    console.error('Login error:', error.response?.data || error.message);
    // Handle login error (e.g., display an error message to the user)
  }

  // Clear the form fields
  setUsername('');
  setPassword('');
  
};

const showUserPassword = () => {
  setShowPassword(!showPassword);
};

  return (
    <div className={styles.modal}>
    <div className={styles.modalcontainer}>
    <button className={styles.closemodal} onClick={onClose}>
              <img src={crossIcon} alt="Close" /> {/* Use the cross icon image */}
            </button>
      <div className={styles.loginform}>
        <h1>Login to Swip Tory</h1>
        <form onSubmit={handleSubmit}>
          <div className={styles.formgroup}>
            <label htmlFor="username" className={styles.label}>Username</label>
            <input
              type="text"
              name="username"
              id="username"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
              className={styles.input}
            />
          </div>
          <div className={styles.formgroup}>
            <label htmlFor="password" className={styles.label}>Password</label>
            <input
              type="password"
              name="password"
              id="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className={styles.input}
            />
             {showPassword ? (
            <FaEye className={styles.icon} onClick={showUserPassword} />
          ) : (
            <FaEyeSlash className={styles.icon} onClick={showUserPassword} />
          )}
          </div>
          <p className={styles.error}>{error}</p>
          <button type="submit" className={styles.loginbtn}>Login</button>
        </form>
      </div>
    </div>
  </div>
);
}

export default Login;