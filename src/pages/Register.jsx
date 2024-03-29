import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function Register() {
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    password: '',
    password2: ''
  });

  const [error, setError] = useState('');
  const navigate = useNavigate(); // Corrected: Added parentheses to call useNavigate

  const changeInputHandler = (e) => {
    setUserData((prevState) => {
      return { ...prevState, [e.target.name]: e.target.value };
    });
  };

  const registerUser = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/users/register`, userData);
      const newUser = response?.data; // Use optional chaining to handle potential undefined response
      console.log(newUser);
      if (!newUser) {
        setError('Could not register user. Please try again.');
      } else {
        navigate('/login')();
      }
    } catch (err) {
      setError(err.response?.data?.message || 'An error occurred during registration.');
    }
  };
  

  return (
    <div>
      <section className="register">
        <div className="container">
          <h2>Sign Up</h2>
          <form action="" className="form register__form" onSubmit={registerUser}>
            {error && <p className="form__error-message">{error}</p>}
            <input type="text" placeholder="Full Name" name="name" value={userData.name} onChange={changeInputHandler} />
            <input type="email" placeholder="Email" name="email" value={userData.email} onChange={changeInputHandler} />
            <input type="password" placeholder="Password" name="password" value={userData.password} onChange={changeInputHandler} />
            <input type="password" placeholder="Confirm Password" name="password2" value={userData.password2} onChange={changeInputHandler} />
            <button type="submit" className="btn primary">
              Register
            </button>
          </form>
          <small>
            Already have an account? <Link className='small' to="/login">Login</Link>
          </small>
        </div>
      </section>
    </div>
  );
}

export default Register;
