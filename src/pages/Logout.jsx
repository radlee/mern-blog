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
                await axios.post(`${process.env.REACT_APP_BASE_URL}/users/logout`);

                // Clear the user context
                setCurrentUser(null);

                // Redirect to the login page
                navigate('/login');
            } catch (error) {
                console.error('Logout failed:', error);
            }
        };

        // Call the logout function
        logout();
    }, [setCurrentUser, navigate]);

    return null;
}

export default Logout;
