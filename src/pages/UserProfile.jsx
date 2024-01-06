import React, { useState } from 'react'
import { FaUserEdit } from "react-icons/fa"
import { FaCheckCircle  } from "react-icons/fa";
import { Link } from "react-router-dom"
import Avatar from "../images/avatar15.jpg"


function UserProfile() {

    const [avatar, setAvatar] = useState(Avatar)
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');

    return (
        <div>
        <section className="profile">
            <div className="container profile__container">
                <Link to={`/myposts/post2`} className='btn'>My Posts</Link>

                <div className="profile__details">
                    <div className="avatar__wrapper">
                        <div className="profile__avatar">
                            <img src={avatar} alt="" />
                        </div>
                        {/* Form To Update the Author */}
                        <form className="avatar__form">
                            <input type="file" name='avatar' id='avatar' onChange={e => setAvatar(e.target.files[0])} accept='png, jpg, jpeg, webp'/>
                            <label htmlFor='avatar'><FaUserEdit /></label>
                        </form>
                        <button className="profile__avatar-btn">
                            <FaCheckCircle  />
                        </button>
                    </div>
                    <h1>Ackrite Dayze</h1>

                    {/* Form To Update User Details */}

                    <form action="" className="form profile__form">
                        <p className="form__error-message">Error</p>
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
