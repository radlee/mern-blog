import React, { useState, useContext } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { UserContext } from '../context/userContext';

function Login() {

    const [userData, setUserData] = useState({

        email: '',
        password: '',
    });

    const location = useLocation();
    const successMessage = location.state?.message || null;

    const [error, setError] = useState('');
    const navigate = useNavigate();

    const { setCurrentUser } = useContext(UserContext);

    const changeInputHandler = (e) => {
        setUserData(prevState => {
            return {...prevState, [e.target.name] : e.target.value}
        })
    }

    const loginUser = async (e) => {
        e.preventDefault();
        setError('');

        try {
            const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/users/login`, userData)
            const user = await response.data;
            setCurrentUser(user)
            navigate('/')
        } catch (err) {
            setError(err.response.data.message)
        }
    }
    return (
        <div>
            <section className="login">
                <div className="container">
                    <h2>Login</h2>
                    <form action="" className="form login__form" onSubmit={loginUser}>
                         { error && <p className="form__error-message">{error}</p> }
                         {successMessage && <p className="form__success-message" >{successMessage}</p>}
                         <input type="email" placeholder='Email' name='email' value={userData.email} onChange={changeInputHandler} autoFocus/>
                         <input type="password" placeholder='Password' name='password' value={userData.password} onChange={changeInputHandler}/>
                         <button type='submit' className="btn primary">Login</button>
                    </form>
                    <small>Don't have an account? <Link className='small' to='/register'>Register</Link></small>
                </div>
            </section>
        </div>
    )
}

export default Login
