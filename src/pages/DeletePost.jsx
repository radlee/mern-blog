import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../context/userContext';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import Loader from '../components/Loader';

function DeletePost({postId: id}) {

    const navigate = useNavigate();
    const location = useLocation();
    const [isLoading, setIsLoading] = useState(false);

    const { currentUser } = useContext(UserContext);
    const token = currentUser?.token;

    // Redirect to Home Page for any user who is not logged in
    useEffect(() => {
        if(!token) {
        navigate('/login')
        }
    }, []);

    const removePost = async (postId) => {
        setIsLoading(true);
        try {
            const response = await axios.delete(`${process.env.REACT_APP_BASE_URL}/posts/${postId}`, {
                withCredentials: true,
                headers: { Authorization: `Bearer ${token}` },
            });
            if (response.status === 200) {
                if (location.pathname === `/myposts/${currentUser.id}`) {
                    navigate(0); // Refresh Page
                } else {
                    navigate('/');
                }
            }
            setIsLoading(false);
        } catch (error) {
            console.log('Could not delete post.', error);
        }
    };
    if(isLoading) {
        return <Loader />
    }

    return (
        <Link className='btn sm danger' onClick={() => removePost(id)}>Delete</Link>
    )
}

export default DeletePost
