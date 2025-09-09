import React, { useContext, useEffect, useState } from 'react';
import { FaUserEdit, FaCheckCircle } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../context/userContext';
import axios from 'axios';

import default_avatar from '../images/avatar_placeholder.webp';

function UserProfile() {
    const preset_key = 'radmultimedia';
    const cloud_name = 'dhdc57kw9';
    const [avatar, setAvatar] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');

    const [author, setAuthor] = useState({});
    const [isAvatarTouched, setIsAvatarTouched] = useState(false);
    const [error, setError] = useState('');


    const navigate = useNavigate();
    const { currentUser } = useContext(UserContext);
    const token = currentUser?.token;

    useEffect(() => {
        if (!token) {
            navigate('/login');
        }
    }, []);

    useEffect(() => {
        const getAuthor = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/users/${currentUser.id}`);
                setAuthor(response?.data);
            } catch (error) {
                console.log(error);
            }
        };

        getAuthor();
    }, []);

    useEffect(() => {
        const getUser = async () => {
            const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/users/${currentUser.id}`, {
                withCredentials: true,
                headers: { Authorization: `Bearer ${token}` },
            });
            const { name, email, avatar } = response.data;
            setName(name);
            setEmail(email);
            setAvatar(avatar);
        };
        getUser();
    }, [token, currentUser.id]);

    const updateUserDetails = async (e) => {
        e.preventDefault();

        try {
            const userData = new FormData();
            userData.set('name', name);
            userData.set('email', email);
            userData.set('currentPassword', currentPassword);
            userData.set('newPassword', newPassword);
            userData.set('confirmNewPassword', confirmNewPassword);

            const response = await axios.patch(
                `${process.env.REACT_APP_BASE_URL}/users/edit-user`,
                userData,
                { withCredentials: true, headers: { Authorization: `Bearer ${token}` } }
            );

            console.log('After Edit Axios ::', response);

            if (response.status === 200) {
                // Update local state or perform any necessary actions
                setName(response.data.name);
                console.log('User details updated successfully.');
                window.location.reload();
            }
        } catch (error) {
            if (error.response) {
                console.error('Server responded with an error:', error.response.data.message);
                setError(error.response.data.message);
            } else if (error.request) {
                console.error('No response received from the server.');
                setError('No response received from the server. Please try again.');
            } else {
                console.error('Error setting up the request:', error.message);
                setError('An error occurred. Please try again.');
            }
        }
    };

    const handleThumbnailChange = (e) => {
        const file = e.target.files[0];
        if (!file) {
            console.error('No file selected.');
            return;
        }
    
        // Create a temporary URL for the selected image
        const tempImageUrl = URL.createObjectURL(file);
    
        // Set the temporary URL as the source for the image tag
        setAvatar(tempImageUrl);
    
        // Now, you can proceed with uploading the image to the server
        try {
            const imageData = new FormData();
            imageData.append('file', file);
            imageData.append('upload_preset', preset_key);
    
            axios.post(`https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`, imageData)
                .then((response) => {
                    console.log('After Axios --- ', response.data);
                    // Set Avatar with the Cloudinary URL
                    setAvatar(response.data.secure_url || '');
    
                    // You can optionally reset the file input value to allow selecting the same file again
                    e.target.value = null;
                })
                .catch((error) => {
                    console.error(error);
                });
        } catch (error) {
            console.error(error);
        }
    };

    const changeAvatarHandler = async () => {
        setIsAvatarTouched(false);
        try {
            const postData = new FormData();
            postData.set('avatar', avatar);
            const response = await axios.post(
                `${process.env.REACT_APP_BASE_URL}/users/change-avatar`,
                postData,
                { withCredentials: true, headers: { Authorization: `Bearer ${token}` } }
            );
            // SetAvatar with the Cloudinary URL returned from the API
            setAvatar(response?.data.avatar);
            console.log('Avatar updated successfully.');
            window.location.reload();
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div>
            <section className="profile">
                <div className="container profile__container">
                    <Link to={`/myposts/${currentUser.id}`} className="btn btn-my-posts">
                        My Posts
                    </Link>

                    <div className="profile__details">
                        <div className="avatar__wrapper">
                            <div className="profile__avatar">
                                {author.avatar ? (
                                    <img src={author?.avatar} alt="User Avatar" />
                                ) : (
                                    <img src={default_avatar} alt="Default Avatar" />
                                )}
                            </div>
                            {/* Form To Update the Author */}
                            <form className="avatar__form" onSubmit={updateUserDetails}>
                                <input
                                    type="file"
                                    name="avatar"
                                    id="avatar"
                                    onChange={handleThumbnailChange}
                                    accept="png, jpg, jpeg, webp, gif"
                                />
                                <label htmlFor="avatar" onClick={() => setIsAvatarTouched(true)}>
                                    <FaUserEdit />
                                </label>
                            </form>
                            {isAvatarTouched ? (
                                <button className="profile__avatar-btn" onClick={changeAvatarHandler}>
                                    <FaCheckCircle />
                                </button>
                            ) : null}
                        </div>
                        <h1>{author.name}</h1>

                        {/* Form To Update User Details */}

                        <form action="" className="form profile__form" onSubmit={updateUserDetails}>
                            {error && <p className="form__error-message">{error}</p>}
                            <input
                                type="text"
                                placeholder="Full Name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                            <input
                                type="email"
                                placeholder="E-Mail"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <input
                                type="password"
                                placeholder="Current Password"
                                value={currentPassword}
                                onChange={(e) => setCurrentPassword(e.target.value)}
                            />
                            <input
                                type="password"
                                placeholder="New Password"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                            />
                            <input
                                type="password"
                                placeholder="Confirm New Password"
                                value={confirmNewPassword}
                                onChange={(e) => setConfirmNewPassword(e.target.value)}
                            />
                            <button type="submit" className="btn primary">
                                Update Details
                            </button>
                            <br />
                        </form>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default UserProfile;
