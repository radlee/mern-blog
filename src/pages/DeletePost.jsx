import React, { useContext, useEffect } from 'react';
import { UserContext } from '../context/userContext';
import { useNavigate } from 'react-router-dom';

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
        <></>
    )
}

export default DeletePost
