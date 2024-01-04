import React, { useState } from 'react'
import { FaUserEdit } from "react-icons/fa"
import { FaCheckCircle  } from "react-icons/fa";
import { Link } from "react-router-dom"
import Avatar from "../images/avatar15.jpg"


function UserProfile() {
    const [avatar, setAvatar] = useState('')
    return (
        <div>
        <section className="profile">
            <div className="container profile__container">
                <Link to={`/myposts/post2`} className='btn'>My Posts</Link>

                <div className="profile__details">
                    <div className="avatar__wrapper">
                        <div className="profile__avatar">
                            <img src={Avatar} alt="" />
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
                </div>
            </div>
        </section>
    </div>
    )
}

export default UserProfile
