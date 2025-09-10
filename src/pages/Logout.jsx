import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/userContext';
import axios from 'axios';

function Logout() {
  const { setCurrentUser } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    const logout = async () => {
      try {
        // Perform the logout request to the backend
        await axios.post(`${process.env.REACT_APP_BASE_URL}/users/logout`, {}, { withCredentials: true });

        // Clear user from context
        setCurrentUser(null);

        // Remove user from localStorage (important if you persist login)
        localStorage.removeItem('currentUser');

        // Redirect to login page
        navigate('/login', { replace: true });
      } catch (error) {
        console.error('Logout failed:', error);
      }
    };

    logout();
  }, [setCurrentUser, navigate]);

  return null;
}

export default Logout;
