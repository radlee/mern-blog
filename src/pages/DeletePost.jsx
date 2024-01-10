import React, { useContext, useEffect } from 'react';
import { UserContext } from '../context/userContext';
import { Link, useNavigate } from 'react-router-dom';

function DeletePost() {

    const navigate = useNavigate();
    const { currentUser } = useContext(UserContext);
    const token = currentUser?.token;

    // Redirect to Home Page for any user who is not logged in
    useEffect(() => {
        if(!token) {
        navigate('/login')
        }
    }, []);

    return (
        <Link className='btn sm danger'>Delete</Link>
    )
}

export default DeletePost
