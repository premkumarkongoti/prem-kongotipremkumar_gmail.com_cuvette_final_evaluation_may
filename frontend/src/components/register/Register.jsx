import React, { useState } from 'react';
import styles from './Register.module.css';
import crossIcon from '../../assets/close.png'
import axios from 'axios';
import { FaEyeSlash } from "react-icons/fa6";
import { FaEye } from "react-icons/fa";

const Register = ({onClose}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState("");

  //const [showModal, setShowModal] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const showUserPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleCloseModal = () => {
    console.log("closed");
   // setShowModal(false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('https://prem-kongotipremkumar-gmail-com-cuvette-final-evaluation-may.vercel.app/api/auth/register', {
        username,
        password,
      });
      console.log(response.data); // Log the response from the backend
      if (response && response.data) {
        console.log(response.data); // Log the response from the backend
        // Reset form fields after successful registration
        setUsername('');
        setPassword('');
       // setShowModal(false); // Optionally close the modal after successful registration
      } else {
        console.error('Error: Response or response data is undefined');
        // Handle undefined response or response data error
      }
    } catch (error) {
      console.error('Error:', error.response?.data || error.message);
      // Handle registration error (e.g., display an error message)
    }
   // setShowModal(false);
  };
  return (
    <div className={styles.modal}>
      <div className={styles.modalcontainer}>
      <button className={styles.closemodal} onClick={onClose}>
              <img src={crossIcon} alt="Close"  /> {/* Use the cross icon image */}
            </button>
        <div className={styles.loginform} >
          <h1>Register to Swip Tory</h1>
          <form onSubmit={handleSubmit}  action="https://prem-kongotipremkumar-gmail-com-cuvette-final-evaluation-may.vercel.app/api/auth/register" method="POST">
            <div className={styles.formgroup}>
              <label htmlFor="username" className={styles.label}>Username:</label>
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
              <label htmlFor="password" className={styles.label}>Password:</label>
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
            <button type="submit" className={styles.loginbtn}>Register</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
 
