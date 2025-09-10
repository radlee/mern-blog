import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../context/userContext';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import Loader from '../components/Loader';

function DeletePost({ postId }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(false);

  const { currentUser } = useContext(UserContext);
  const token = currentUser?.token;

  // Redirect if not logged in
  useEffect(() => {
    if (!token) navigate('/login');
  }, [token, navigate]);

  const removePost = async () => {
    if (!window.confirm("Are you sure you want to delete this post?")) return;

    setIsLoading(true);
    try {
      const response = await axios.delete(
        `${process.env.REACT_APP_BASE_URL}/posts/${postId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true
        }
      );

      if (response.status === 200) {
        // Refresh page if on user's dashboard, otherwise go home
        if (location.pathname === `/myposts/${currentUser.id}`) {
          navigate(0);
        } else {
          navigate('/');
        }
      }
    } catch (error) {
      console.error('Could not delete post:', error);
      alert('Failed to delete post. Try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      className='btn sm danger'
      onClick={removePost}
      disabled={isLoading}
    >
      {isLoading ? 'Deleting...' : 'Delete'}
    </button>
  );
}

export default DeletePost;
