import React, { useState } from 'react'
import { Link } from 'react-router-dom'

function Login() {

    const [userData, setUserData] = useState({

        email: '',
        password: '',
    })

    const changeInputHandler = (e) => {
        setUserData(prevState => {
            return {...prevState, [e.target.name] : e.target.value}
        })
    }
    return (
        <div>
            <section className="login">
                <div className="container">
                    <h2>Login</h2>
                    <form action="" className="form login__form">
                         <p className="form__error-message">Error</p>
                         <input type="email" placeholder='Email' name='email' value={userData.email} onChange={changeInputHandler} autoFocus/>
                         <input type="password" placeholder='Password' name='password1' value={userData.password1} onChange={changeInputHandler}/>
                         <button type='submit' className="btn primary">Login</button>
                    </form>
                    <small>Don't have an account? <Link to='/register'>Register</Link></small>
                </div>
            </section>
        </div>
    )
}

export default Login
