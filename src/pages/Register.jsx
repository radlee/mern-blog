import React, { useState } from 'react'
import { Link } from 'react-router-dom'

function Register() {

    const [userData, setUserData] = useState({
        name: '',
        email: '',
        password1: '',
        password2: ''
    })

    const changeInputHandler = (e) => {
        setUserData(prevState => {
            return {...prevState, [e.target.name] : e.target.value}
        })
    }
    return (
        <div>
            <section className="register">
                <div className="container">
                    <h2>Sign Up</h2>
                    <form action="" className="form register__form">
                         <p className="form__error-message">Error</p>
                         <input type="text" placeholder='Full Name' name='name' value={userData.name} onChange={changeInputHandler}/>
                         <input type="email" placeholder='Email' name='email' value={userData.email} onChange={changeInputHandler}/>
                         <input type="password" placeholder='Password' name='password1' value={userData.password1} onChange={changeInputHandler}/>
                         <input type="password" placeholder='Confirm Password' name='password2' value={userData.password2} onChange={changeInputHandler}/>
                         <button type='submit' className="btn primary">Register</button>
                    </form>
                    <small>Already have an account? <Link to='/login'>Login</Link></small>
                </div>
            </section>
        </div>
    )
}

export default Register
