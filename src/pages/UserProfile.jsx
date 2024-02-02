import React, { useContext, useEffect, useState } from 'react';
import { FaUserEdit } from "react-icons/fa";
import { FaCheckCircle  } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from '../context/userContext';
import axios from 'axios';


function UserProfile() {
    const preset_key = 'radmultimedia';
    const cloud_name = 'dhdc57kw9';
    const [avatar, setAvatar] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');

    console.log("Name -- : ", name)
    console.log("Email -- : ", email)
    console.log("avatar -- : ", avatar)
    
    const [isAvatarTouched, setIsAvatarTouched] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate();
    const { currentUser } = useContext(UserContext);
    const token = currentUser?.token;
    // Redirect to Home Page for any user who is not logged in
    useEffect(() => {
        if(!token) {
        navigate('/login')
        }
    }, []);

    useEffect(() => {
        const getUser = async () => {
            const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/users/${currentUser.id}`, {withCredentials: true, headers: {Authorization: `Bearer ${token}`}});
            const { name, email, avatar } = response.data;
            setName(name);
            setEmail(email);
            setAvatar(avatar);
        }
        getUser()
    }, []);

    const handleThumbnailChange = async (e) => {
        try {
          const file = e.target.files[0];
          setAvatar(file);
          const imageData = new FormData();
          imageData.append('file', file);
          imageData.append('upload_preset', preset_key);
      
      
          const response = await axios.post(`https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`, imageData);
          console.log("After Axios Profile --- ", response.data);
      
          // setAvatar with the Cloudinary URL
          setAvatar(response.data.secure_url || '');
        } catch (error) {
          console.error(error);
        }
      };

    const updateUserDetails = async (e) => {
        e.preventDefault();

        try {
            const userData = new FormData();
            userData.set('name', name);
            userData.set('email', email);
            userData.set('avatar', avatar);
            userData.set('currentPassword', currentPassword);
            userData.set('newPassword', newPassword);
            userData.set('confirmNewPassword', confirmNewPassword);

            const response = await axios.patch(`${process.env.REACT_APP_BASE_URL}/users/edit-user`, userData, {withCredentials: true, headers: {Authorization: `Bearer ${token}`}});
            if(response.status === 200) {
                //Log User Out
                navigate('/logout');
            }
        } catch (error) {
            console.log(error.response.data.message);
        }
    }


    return (
        <div>
        <section className="profile">
            <div className="container profile__container">
                <Link to={`/myposts/${currentUser.id}`} className='btn'>My Posts</Link>

                <div className="profile__details">
                    <div className="avatar__wrapper">
                        <div className="profile__avatar">
                            <img src={avatar} alt="" />
                        </div>
                        {/* Form To Update the Author */}
                        <form className="avatar__form" onSubmit={updateUserDetails}>
                            <input type="file" name='avatar' id='avatar' onChange={handleThumbnailChange} accept='png, jpg, jpeg, webp'/>
                            <label htmlFor='avatar' onClick={() => setAvatar(true)}><FaUserEdit /></label>
                        </form>
                        { isAvatarTouched && <button className="profile__avatar-btn" onClick={ handleThumbnailChange }>
                            <FaCheckCircle  />
                        </button> }
                    </div>
                    <h1>{currentUser.name}</h1>

                    {/* Form To Update User Details */}

                    <form action="" className="form profile__form">
                        { error && <p className="form__error-message">{error}</p> }
                        <input type="text" placeholder='Full Name' value={name} onChange={e => setName(e.target.value)}/>
                        <input type="email" placeholder='E-Mail' value={email} onChange={e => setEmail(e.target.value)}/>
                        <input type="password" placeholder='Current Password' value={currentPassword} onChange={e => setCurrentPassword(e.target.value)}/>
                        <input type="password" placeholder='New Password' value={newPassword} onChange={e => setNewPassword(e.target.value)}/>
                        <input type="password" placeholder='Confirm New Password' value={confirmNewPassword} onChange={e => setConfirmNewPassword(e.target.value)}/>
                        <button className="btn primary">Update Details</button>
                    </form>
                </div>
            </div>
        </section>
    </div>
    )
}

export default UserProfile
