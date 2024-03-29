/* eslint-disable jsx-a11y/img-redundant-alt */
import axios from 'axios';
import React, { useEffect, useState } from 'react'

import { Link } from 'react-router-dom'
import Loader from '../components/Loader';
import default_avatar from '../images/avatar_placeholder.webp';

function Authors() {
  const [authors, setAuthors] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
console.log('Authors :: ', authors)
  useEffect(() => {
    const getAuthors = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/users`);
        setAuthors(response.data);
      } catch (error) {
        console.log(error)
      }
      setIsLoading(false);
    }
    getAuthors();
  }, []);

  if(isLoading) {
    return <Loader />
  }
  return (
    <section className="authors">
      {authors.length > 0 ? <div className="container authors__container">
        {
          authors.map(({_id: id, avatar, name, posts}) => {
            return <Link key={id} to={`/posts/users/${id}`} className='author'>
              <div className="author__avatar">
              {avatar ? (
                            <img src={avatar} alt="User Avatar" />
                        ) : (
                            // Provide a default or placeholder avatar image here
                            <img src={default_avatar} alt={`Image of ${name}`} />
                        )}
              </div>
              <div className="author__info">
                <h4>{name}</h4>
                <p>{posts}</p>
              </div>
            </Link>
          })
        }
      </div> : <h2 className='center'>No Users/Authors Found</h2> }
    </section>
  )
}

export default Authors