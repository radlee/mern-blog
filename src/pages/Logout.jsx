import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/userContext';
import axios from 'axios';

function Logout() {
    const { setCurrentUser } = useContext(UserContext);
    const navigate = useNavigate();

    useEffect(() => {
        const logout = async () => {
            try {
                // Perform any necessary cleanup or server-side logout actions
                // For example, you might want to make an API call to log out on the server

                // Uncomment the following lines if you have a server-side logout endpoint
                // await axios.post('/api/logout');

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

    return <></>;
}

export default Logout;
